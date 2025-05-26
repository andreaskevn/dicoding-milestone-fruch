import * as tmImage from "@teachablemachine/image";
import { PredictionResult } from "@/lib/definition";

let model: any = null;

const MODEL_URL = "/model/";

export async function loadModel() {
    if (!model) {
        const modelURL = MODEL_URL + "model.json";
        const metadataURL = MODEL_URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
    }
    return model;
}

export async function classifyImage(image: HTMLImageElement | HTMLCanvasElement): Promise<PredictionResult[]> {
    const model = await loadModel();
    const predictions = await model.predict(image);
    console.log(`prediksi:`, predictions);
    return predictions.map((p: any) => ({
        className: p.className,
        probability: parseFloat(p.probability.toFixed(2))
    }));
}
