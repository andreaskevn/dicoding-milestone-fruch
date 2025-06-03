import * as tf from "@tensorflow/tfjs";
import type { PredictionResult } from "@/lib/definition";

let model: tf.GraphModel | null = null;

const MODEL_URL = "/model-chat-2/model.json";

const CLASS_NAMES = [
  "Apel",
  "Pisang",
  "Jeruk",
  "Tomat",
  "Apel Busuk",
  "Pisang Busuk",
  "Jeruk Busuk",
  "Tomat Busuk",
];

const INPUT_TENSOR_NAME = "input_layer_1:0";
const OUTPUT_TENSOR_NAME = "Identity:0";

export async function loadModel(): Promise<tf.GraphModel> {
  if (!model) {
    try {
      console.log("Memuat GraphModel dari:", MODEL_URL);
      model = await tf.loadGraphModel(MODEL_URL);
      console.log("GraphModel berhasil dimuat.");
      tf.tidy(() => {
        try {
          const dummyInput = tf.zeros([1, 224, 224, 3]);
          const dummyInputMap: { [key: string]: tf.Tensor } = {};
          dummyInputMap[INPUT_TENSOR_NAME] = dummyInput;
          const prediction = model!.predict(dummyInputMap) as tf.Tensor;
          prediction.dispose();
          console.log("GraphModel warm-up selesai.");
        } catch (warmupError) {
          console.error("Error saat warm-up GraphModel:", warmupError);
        }
      });
    } catch (error: any) {
      console.error("Gagal memuat GraphModel (detail error):", error);
      console.error("Nama error:", error.name);
      console.error("Pesan error:", error.message);
      throw new Error(`Gagal memuat GraphModel: ${error.message}`);
    }
  }
  return model;
}

export async function classifyImage(
  imageElement: HTMLImageElement | HTMLCanvasElement
): Promise<PredictionResult[]> {
  const loadedModel = await loadModel();

  if (!loadedModel) {
    console.error("GraphModel belum berhasil dimuat untuk klasifikasi.");
    throw new Error("GraphModel belum berhasil dimuat untuk klasifikasi.");
  }

  let tensor: tf.Tensor | null = null;
  let predictionsOutput: tf.Tensor | tf.Tensor[] | tf.NamedTensorMap | null =
    null;
  const results: PredictionResult[] = [];

  try {
    tensor = tf.tidy(() => {
      const pixels = tf.browser.fromPixels(imageElement);
      const resized = tf.image.resizeNearestNeighbor(pixels, [224, 224]);
      const toFloat = resized.toFloat();
      const normalized = toFloat.div(tf.scalar(127.5)).sub(tf.scalar(1.0));
      return normalized.expandDims(0);
    });

    const inputs: { [key: string]: tf.Tensor } = {};
    inputs[INPUT_TENSOR_NAME] = tensor;

    const outputTensor = loadedModel.execute(
      inputs,
      OUTPUT_TENSOR_NAME
    ) as tf.Tensor;

    predictionsOutput = outputTensor;

    const probabilities = (await outputTensor.data()) as Float32Array;

    console.log("Tensor input shape:", tensor.shape);
    console.log("Output prediksi mentah (tensor):");
    outputTensor.print();
    console.log("Probabilitas (data dari tensor):", probabilities);

    if (probabilities && probabilities.length === CLASS_NAMES.length) {
      for (let i = 0; i < probabilities.length; i++) {
        results.push({
          className: CLASS_NAMES[i],
          probability: probabilities[i],
        });
      }
      results.sort((a, b) => b.probability - a.probability);
    } else {
      console.error(
        "Output prediksi tidak sesuai: jumlah probabilitas tidak cocok dengan jumlah nama kelas atau data kosong.",
        `Probabilities length: ${probabilities?.length}, Class names length: ${CLASS_NAMES.length}`
      );
    }
    return results;
  } catch (error) {
    console.error("Kesalahan saat klasifikasi gambar:", error);
    throw new Error(
      `Kesalahan klasifikasi: ${error instanceof Error ? error.message : String(error)}`
    );
  } finally {
    if (tensor) tensor.dispose();
    if (predictionsOutput) {
      if (predictionsOutput instanceof tf.Tensor) {
        predictionsOutput.dispose();
      } else if (
        typeof predictionsOutput === "object" &&
        predictionsOutput !== null
      ) {
        Object.values(predictionsOutput).forEach((t) => t.dispose());
      }
    }
    console.log("Tensor dibersihkan.");
  }
}
