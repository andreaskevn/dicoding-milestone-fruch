
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Buah
 * 
 */
export type Buah = $Result.DefaultSelection<Prisma.$BuahPayload>
/**
 * Model ScanBuah
 * 
 */
export type ScanBuah = $Result.DefaultSelection<Prisma.$ScanBuahPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.buah`: Exposes CRUD operations for the **Buah** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Buahs
    * const buahs = await prisma.buah.findMany()
    * ```
    */
  get buah(): Prisma.BuahDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scanBuah`: Exposes CRUD operations for the **ScanBuah** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScanBuahs
    * const scanBuahs = await prisma.scanBuah.findMany()
    * ```
    */
  get scanBuah(): Prisma.ScanBuahDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Buah: 'Buah',
    ScanBuah: 'ScanBuah'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "buah" | "scanBuah"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Buah: {
        payload: Prisma.$BuahPayload<ExtArgs>
        fields: Prisma.BuahFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BuahFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuahPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BuahFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuahPayload>
          }
          findFirst: {
            args: Prisma.BuahFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuahPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BuahFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuahPayload>
          }
          findMany: {
            args: Prisma.BuahFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuahPayload>[]
          }
          create: {
            args: Prisma.BuahCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuahPayload>
          }
          createMany: {
            args: Prisma.BuahCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BuahCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuahPayload>[]
          }
          delete: {
            args: Prisma.BuahDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuahPayload>
          }
          update: {
            args: Prisma.BuahUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuahPayload>
          }
          deleteMany: {
            args: Prisma.BuahDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BuahUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BuahUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuahPayload>[]
          }
          upsert: {
            args: Prisma.BuahUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuahPayload>
          }
          aggregate: {
            args: Prisma.BuahAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBuah>
          }
          groupBy: {
            args: Prisma.BuahGroupByArgs<ExtArgs>
            result: $Utils.Optional<BuahGroupByOutputType>[]
          }
          count: {
            args: Prisma.BuahCountArgs<ExtArgs>
            result: $Utils.Optional<BuahCountAggregateOutputType> | number
          }
        }
      }
      ScanBuah: {
        payload: Prisma.$ScanBuahPayload<ExtArgs>
        fields: Prisma.ScanBuahFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScanBuahFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanBuahPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScanBuahFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanBuahPayload>
          }
          findFirst: {
            args: Prisma.ScanBuahFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanBuahPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScanBuahFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanBuahPayload>
          }
          findMany: {
            args: Prisma.ScanBuahFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanBuahPayload>[]
          }
          create: {
            args: Prisma.ScanBuahCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanBuahPayload>
          }
          createMany: {
            args: Prisma.ScanBuahCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScanBuahCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanBuahPayload>[]
          }
          delete: {
            args: Prisma.ScanBuahDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanBuahPayload>
          }
          update: {
            args: Prisma.ScanBuahUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanBuahPayload>
          }
          deleteMany: {
            args: Prisma.ScanBuahDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScanBuahUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScanBuahUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanBuahPayload>[]
          }
          upsert: {
            args: Prisma.ScanBuahUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanBuahPayload>
          }
          aggregate: {
            args: Prisma.ScanBuahAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScanBuah>
          }
          groupBy: {
            args: Prisma.ScanBuahGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScanBuahGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScanBuahCountArgs<ExtArgs>
            result: $Utils.Optional<ScanBuahCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    buah?: BuahOmit
    scanBuah?: ScanBuahOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    ScanBuah: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ScanBuah?: boolean | UserCountOutputTypeCountScanBuahArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountScanBuahArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanBuahWhereInput
  }


  /**
   * Count Type BuahCountOutputType
   */

  export type BuahCountOutputType = {
    ScanBuah: number
  }

  export type BuahCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ScanBuah?: boolean | BuahCountOutputTypeCountScanBuahArgs
  }

  // Custom InputTypes
  /**
   * BuahCountOutputType without action
   */
  export type BuahCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuahCountOutputType
     */
    select?: BuahCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BuahCountOutputType without action
   */
  export type BuahCountOutputTypeCountScanBuahArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanBuahWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    name: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ScanBuah?: boolean | User$ScanBuahArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ScanBuah?: boolean | User$ScanBuahArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      ScanBuah: Prisma.$ScanBuahPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      name: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ScanBuah<T extends User$ScanBuahArgs<ExtArgs> = {}>(args?: Subset<T, User$ScanBuahArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanBuahPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.ScanBuah
   */
  export type User$ScanBuahArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanBuah
     */
    select?: ScanBuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanBuah
     */
    omit?: ScanBuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanBuahInclude<ExtArgs> | null
    where?: ScanBuahWhereInput
    orderBy?: ScanBuahOrderByWithRelationInput | ScanBuahOrderByWithRelationInput[]
    cursor?: ScanBuahWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScanBuahScalarFieldEnum | ScanBuahScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Buah
   */

  export type AggregateBuah = {
    _count: BuahCountAggregateOutputType | null
    _min: BuahMinAggregateOutputType | null
    _max: BuahMaxAggregateOutputType | null
  }

  export type BuahMinAggregateOutputType = {
    id: string | null
    namaBuah: string | null
    manfaat: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BuahMaxAggregateOutputType = {
    id: string | null
    namaBuah: string | null
    manfaat: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BuahCountAggregateOutputType = {
    id: number
    namaBuah: number
    manfaat: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BuahMinAggregateInputType = {
    id?: true
    namaBuah?: true
    manfaat?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BuahMaxAggregateInputType = {
    id?: true
    namaBuah?: true
    manfaat?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BuahCountAggregateInputType = {
    id?: true
    namaBuah?: true
    manfaat?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BuahAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Buah to aggregate.
     */
    where?: BuahWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buahs to fetch.
     */
    orderBy?: BuahOrderByWithRelationInput | BuahOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BuahWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buahs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buahs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Buahs
    **/
    _count?: true | BuahCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BuahMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BuahMaxAggregateInputType
  }

  export type GetBuahAggregateType<T extends BuahAggregateArgs> = {
        [P in keyof T & keyof AggregateBuah]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBuah[P]>
      : GetScalarType<T[P], AggregateBuah[P]>
  }




  export type BuahGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BuahWhereInput
    orderBy?: BuahOrderByWithAggregationInput | BuahOrderByWithAggregationInput[]
    by: BuahScalarFieldEnum[] | BuahScalarFieldEnum
    having?: BuahScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BuahCountAggregateInputType | true
    _min?: BuahMinAggregateInputType
    _max?: BuahMaxAggregateInputType
  }

  export type BuahGroupByOutputType = {
    id: string
    namaBuah: string
    manfaat: string
    createdAt: Date
    updatedAt: Date
    _count: BuahCountAggregateOutputType | null
    _min: BuahMinAggregateOutputType | null
    _max: BuahMaxAggregateOutputType | null
  }

  type GetBuahGroupByPayload<T extends BuahGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BuahGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BuahGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BuahGroupByOutputType[P]>
            : GetScalarType<T[P], BuahGroupByOutputType[P]>
        }
      >
    >


  export type BuahSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    namaBuah?: boolean
    manfaat?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ScanBuah?: boolean | Buah$ScanBuahArgs<ExtArgs>
    _count?: boolean | BuahCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["buah"]>

  export type BuahSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    namaBuah?: boolean
    manfaat?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["buah"]>

  export type BuahSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    namaBuah?: boolean
    manfaat?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["buah"]>

  export type BuahSelectScalar = {
    id?: boolean
    namaBuah?: boolean
    manfaat?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BuahOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "namaBuah" | "manfaat" | "createdAt" | "updatedAt", ExtArgs["result"]["buah"]>
  export type BuahInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ScanBuah?: boolean | Buah$ScanBuahArgs<ExtArgs>
    _count?: boolean | BuahCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BuahIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BuahIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BuahPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Buah"
    objects: {
      ScanBuah: Prisma.$ScanBuahPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      namaBuah: string
      manfaat: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["buah"]>
    composites: {}
  }

  type BuahGetPayload<S extends boolean | null | undefined | BuahDefaultArgs> = $Result.GetResult<Prisma.$BuahPayload, S>

  type BuahCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BuahFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BuahCountAggregateInputType | true
    }

  export interface BuahDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Buah'], meta: { name: 'Buah' } }
    /**
     * Find zero or one Buah that matches the filter.
     * @param {BuahFindUniqueArgs} args - Arguments to find a Buah
     * @example
     * // Get one Buah
     * const buah = await prisma.buah.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BuahFindUniqueArgs>(args: SelectSubset<T, BuahFindUniqueArgs<ExtArgs>>): Prisma__BuahClient<$Result.GetResult<Prisma.$BuahPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Buah that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BuahFindUniqueOrThrowArgs} args - Arguments to find a Buah
     * @example
     * // Get one Buah
     * const buah = await prisma.buah.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BuahFindUniqueOrThrowArgs>(args: SelectSubset<T, BuahFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BuahClient<$Result.GetResult<Prisma.$BuahPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Buah that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuahFindFirstArgs} args - Arguments to find a Buah
     * @example
     * // Get one Buah
     * const buah = await prisma.buah.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BuahFindFirstArgs>(args?: SelectSubset<T, BuahFindFirstArgs<ExtArgs>>): Prisma__BuahClient<$Result.GetResult<Prisma.$BuahPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Buah that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuahFindFirstOrThrowArgs} args - Arguments to find a Buah
     * @example
     * // Get one Buah
     * const buah = await prisma.buah.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BuahFindFirstOrThrowArgs>(args?: SelectSubset<T, BuahFindFirstOrThrowArgs<ExtArgs>>): Prisma__BuahClient<$Result.GetResult<Prisma.$BuahPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Buahs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuahFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Buahs
     * const buahs = await prisma.buah.findMany()
     * 
     * // Get first 10 Buahs
     * const buahs = await prisma.buah.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const buahWithIdOnly = await prisma.buah.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BuahFindManyArgs>(args?: SelectSubset<T, BuahFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuahPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Buah.
     * @param {BuahCreateArgs} args - Arguments to create a Buah.
     * @example
     * // Create one Buah
     * const Buah = await prisma.buah.create({
     *   data: {
     *     // ... data to create a Buah
     *   }
     * })
     * 
     */
    create<T extends BuahCreateArgs>(args: SelectSubset<T, BuahCreateArgs<ExtArgs>>): Prisma__BuahClient<$Result.GetResult<Prisma.$BuahPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Buahs.
     * @param {BuahCreateManyArgs} args - Arguments to create many Buahs.
     * @example
     * // Create many Buahs
     * const buah = await prisma.buah.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BuahCreateManyArgs>(args?: SelectSubset<T, BuahCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Buahs and returns the data saved in the database.
     * @param {BuahCreateManyAndReturnArgs} args - Arguments to create many Buahs.
     * @example
     * // Create many Buahs
     * const buah = await prisma.buah.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Buahs and only return the `id`
     * const buahWithIdOnly = await prisma.buah.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BuahCreateManyAndReturnArgs>(args?: SelectSubset<T, BuahCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuahPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Buah.
     * @param {BuahDeleteArgs} args - Arguments to delete one Buah.
     * @example
     * // Delete one Buah
     * const Buah = await prisma.buah.delete({
     *   where: {
     *     // ... filter to delete one Buah
     *   }
     * })
     * 
     */
    delete<T extends BuahDeleteArgs>(args: SelectSubset<T, BuahDeleteArgs<ExtArgs>>): Prisma__BuahClient<$Result.GetResult<Prisma.$BuahPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Buah.
     * @param {BuahUpdateArgs} args - Arguments to update one Buah.
     * @example
     * // Update one Buah
     * const buah = await prisma.buah.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BuahUpdateArgs>(args: SelectSubset<T, BuahUpdateArgs<ExtArgs>>): Prisma__BuahClient<$Result.GetResult<Prisma.$BuahPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Buahs.
     * @param {BuahDeleteManyArgs} args - Arguments to filter Buahs to delete.
     * @example
     * // Delete a few Buahs
     * const { count } = await prisma.buah.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BuahDeleteManyArgs>(args?: SelectSubset<T, BuahDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Buahs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuahUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Buahs
     * const buah = await prisma.buah.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BuahUpdateManyArgs>(args: SelectSubset<T, BuahUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Buahs and returns the data updated in the database.
     * @param {BuahUpdateManyAndReturnArgs} args - Arguments to update many Buahs.
     * @example
     * // Update many Buahs
     * const buah = await prisma.buah.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Buahs and only return the `id`
     * const buahWithIdOnly = await prisma.buah.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BuahUpdateManyAndReturnArgs>(args: SelectSubset<T, BuahUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuahPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Buah.
     * @param {BuahUpsertArgs} args - Arguments to update or create a Buah.
     * @example
     * // Update or create a Buah
     * const buah = await prisma.buah.upsert({
     *   create: {
     *     // ... data to create a Buah
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Buah we want to update
     *   }
     * })
     */
    upsert<T extends BuahUpsertArgs>(args: SelectSubset<T, BuahUpsertArgs<ExtArgs>>): Prisma__BuahClient<$Result.GetResult<Prisma.$BuahPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Buahs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuahCountArgs} args - Arguments to filter Buahs to count.
     * @example
     * // Count the number of Buahs
     * const count = await prisma.buah.count({
     *   where: {
     *     // ... the filter for the Buahs we want to count
     *   }
     * })
    **/
    count<T extends BuahCountArgs>(
      args?: Subset<T, BuahCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BuahCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Buah.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuahAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BuahAggregateArgs>(args: Subset<T, BuahAggregateArgs>): Prisma.PrismaPromise<GetBuahAggregateType<T>>

    /**
     * Group by Buah.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuahGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BuahGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BuahGroupByArgs['orderBy'] }
        : { orderBy?: BuahGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BuahGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBuahGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Buah model
   */
  readonly fields: BuahFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Buah.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BuahClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ScanBuah<T extends Buah$ScanBuahArgs<ExtArgs> = {}>(args?: Subset<T, Buah$ScanBuahArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanBuahPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Buah model
   */
  interface BuahFieldRefs {
    readonly id: FieldRef<"Buah", 'String'>
    readonly namaBuah: FieldRef<"Buah", 'String'>
    readonly manfaat: FieldRef<"Buah", 'String'>
    readonly createdAt: FieldRef<"Buah", 'DateTime'>
    readonly updatedAt: FieldRef<"Buah", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Buah findUnique
   */
  export type BuahFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buah
     */
    select?: BuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buah
     */
    omit?: BuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuahInclude<ExtArgs> | null
    /**
     * Filter, which Buah to fetch.
     */
    where: BuahWhereUniqueInput
  }

  /**
   * Buah findUniqueOrThrow
   */
  export type BuahFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buah
     */
    select?: BuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buah
     */
    omit?: BuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuahInclude<ExtArgs> | null
    /**
     * Filter, which Buah to fetch.
     */
    where: BuahWhereUniqueInput
  }

  /**
   * Buah findFirst
   */
  export type BuahFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buah
     */
    select?: BuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buah
     */
    omit?: BuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuahInclude<ExtArgs> | null
    /**
     * Filter, which Buah to fetch.
     */
    where?: BuahWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buahs to fetch.
     */
    orderBy?: BuahOrderByWithRelationInput | BuahOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Buahs.
     */
    cursor?: BuahWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buahs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buahs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Buahs.
     */
    distinct?: BuahScalarFieldEnum | BuahScalarFieldEnum[]
  }

  /**
   * Buah findFirstOrThrow
   */
  export type BuahFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buah
     */
    select?: BuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buah
     */
    omit?: BuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuahInclude<ExtArgs> | null
    /**
     * Filter, which Buah to fetch.
     */
    where?: BuahWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buahs to fetch.
     */
    orderBy?: BuahOrderByWithRelationInput | BuahOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Buahs.
     */
    cursor?: BuahWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buahs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buahs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Buahs.
     */
    distinct?: BuahScalarFieldEnum | BuahScalarFieldEnum[]
  }

  /**
   * Buah findMany
   */
  export type BuahFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buah
     */
    select?: BuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buah
     */
    omit?: BuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuahInclude<ExtArgs> | null
    /**
     * Filter, which Buahs to fetch.
     */
    where?: BuahWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buahs to fetch.
     */
    orderBy?: BuahOrderByWithRelationInput | BuahOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Buahs.
     */
    cursor?: BuahWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buahs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buahs.
     */
    skip?: number
    distinct?: BuahScalarFieldEnum | BuahScalarFieldEnum[]
  }

  /**
   * Buah create
   */
  export type BuahCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buah
     */
    select?: BuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buah
     */
    omit?: BuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuahInclude<ExtArgs> | null
    /**
     * The data needed to create a Buah.
     */
    data: XOR<BuahCreateInput, BuahUncheckedCreateInput>
  }

  /**
   * Buah createMany
   */
  export type BuahCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Buahs.
     */
    data: BuahCreateManyInput | BuahCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Buah createManyAndReturn
   */
  export type BuahCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buah
     */
    select?: BuahSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Buah
     */
    omit?: BuahOmit<ExtArgs> | null
    /**
     * The data used to create many Buahs.
     */
    data: BuahCreateManyInput | BuahCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Buah update
   */
  export type BuahUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buah
     */
    select?: BuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buah
     */
    omit?: BuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuahInclude<ExtArgs> | null
    /**
     * The data needed to update a Buah.
     */
    data: XOR<BuahUpdateInput, BuahUncheckedUpdateInput>
    /**
     * Choose, which Buah to update.
     */
    where: BuahWhereUniqueInput
  }

  /**
   * Buah updateMany
   */
  export type BuahUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Buahs.
     */
    data: XOR<BuahUpdateManyMutationInput, BuahUncheckedUpdateManyInput>
    /**
     * Filter which Buahs to update
     */
    where?: BuahWhereInput
    /**
     * Limit how many Buahs to update.
     */
    limit?: number
  }

  /**
   * Buah updateManyAndReturn
   */
  export type BuahUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buah
     */
    select?: BuahSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Buah
     */
    omit?: BuahOmit<ExtArgs> | null
    /**
     * The data used to update Buahs.
     */
    data: XOR<BuahUpdateManyMutationInput, BuahUncheckedUpdateManyInput>
    /**
     * Filter which Buahs to update
     */
    where?: BuahWhereInput
    /**
     * Limit how many Buahs to update.
     */
    limit?: number
  }

  /**
   * Buah upsert
   */
  export type BuahUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buah
     */
    select?: BuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buah
     */
    omit?: BuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuahInclude<ExtArgs> | null
    /**
     * The filter to search for the Buah to update in case it exists.
     */
    where: BuahWhereUniqueInput
    /**
     * In case the Buah found by the `where` argument doesn't exist, create a new Buah with this data.
     */
    create: XOR<BuahCreateInput, BuahUncheckedCreateInput>
    /**
     * In case the Buah was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BuahUpdateInput, BuahUncheckedUpdateInput>
  }

  /**
   * Buah delete
   */
  export type BuahDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buah
     */
    select?: BuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buah
     */
    omit?: BuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuahInclude<ExtArgs> | null
    /**
     * Filter which Buah to delete.
     */
    where: BuahWhereUniqueInput
  }

  /**
   * Buah deleteMany
   */
  export type BuahDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Buahs to delete
     */
    where?: BuahWhereInput
    /**
     * Limit how many Buahs to delete.
     */
    limit?: number
  }

  /**
   * Buah.ScanBuah
   */
  export type Buah$ScanBuahArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanBuah
     */
    select?: ScanBuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanBuah
     */
    omit?: ScanBuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanBuahInclude<ExtArgs> | null
    where?: ScanBuahWhereInput
    orderBy?: ScanBuahOrderByWithRelationInput | ScanBuahOrderByWithRelationInput[]
    cursor?: ScanBuahWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScanBuahScalarFieldEnum | ScanBuahScalarFieldEnum[]
  }

  /**
   * Buah without action
   */
  export type BuahDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buah
     */
    select?: BuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buah
     */
    omit?: BuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuahInclude<ExtArgs> | null
  }


  /**
   * Model ScanBuah
   */

  export type AggregateScanBuah = {
    _count: ScanBuahCountAggregateOutputType | null
    _avg: ScanBuahAvgAggregateOutputType | null
    _sum: ScanBuahSumAggregateOutputType | null
    _min: ScanBuahMinAggregateOutputType | null
    _max: ScanBuahMaxAggregateOutputType | null
  }

  export type ScanBuahAvgAggregateOutputType = {
    probability: number | null
  }

  export type ScanBuahSumAggregateOutputType = {
    probability: number | null
  }

  export type ScanBuahMinAggregateOutputType = {
    id: string | null
    predictedBuahName: string | null
    probability: number | null
    imageUrl: string | null
    scannedAt: Date | null
    userId: string | null
    buahId: string | null
  }

  export type ScanBuahMaxAggregateOutputType = {
    id: string | null
    predictedBuahName: string | null
    probability: number | null
    imageUrl: string | null
    scannedAt: Date | null
    userId: string | null
    buahId: string | null
  }

  export type ScanBuahCountAggregateOutputType = {
    id: number
    predictedBuahName: number
    probability: number
    imageUrl: number
    scannedAt: number
    userId: number
    buahId: number
    _all: number
  }


  export type ScanBuahAvgAggregateInputType = {
    probability?: true
  }

  export type ScanBuahSumAggregateInputType = {
    probability?: true
  }

  export type ScanBuahMinAggregateInputType = {
    id?: true
    predictedBuahName?: true
    probability?: true
    imageUrl?: true
    scannedAt?: true
    userId?: true
    buahId?: true
  }

  export type ScanBuahMaxAggregateInputType = {
    id?: true
    predictedBuahName?: true
    probability?: true
    imageUrl?: true
    scannedAt?: true
    userId?: true
    buahId?: true
  }

  export type ScanBuahCountAggregateInputType = {
    id?: true
    predictedBuahName?: true
    probability?: true
    imageUrl?: true
    scannedAt?: true
    userId?: true
    buahId?: true
    _all?: true
  }

  export type ScanBuahAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScanBuah to aggregate.
     */
    where?: ScanBuahWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanBuahs to fetch.
     */
    orderBy?: ScanBuahOrderByWithRelationInput | ScanBuahOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScanBuahWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanBuahs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanBuahs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScanBuahs
    **/
    _count?: true | ScanBuahCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScanBuahAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScanBuahSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScanBuahMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScanBuahMaxAggregateInputType
  }

  export type GetScanBuahAggregateType<T extends ScanBuahAggregateArgs> = {
        [P in keyof T & keyof AggregateScanBuah]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScanBuah[P]>
      : GetScalarType<T[P], AggregateScanBuah[P]>
  }




  export type ScanBuahGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanBuahWhereInput
    orderBy?: ScanBuahOrderByWithAggregationInput | ScanBuahOrderByWithAggregationInput[]
    by: ScanBuahScalarFieldEnum[] | ScanBuahScalarFieldEnum
    having?: ScanBuahScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScanBuahCountAggregateInputType | true
    _avg?: ScanBuahAvgAggregateInputType
    _sum?: ScanBuahSumAggregateInputType
    _min?: ScanBuahMinAggregateInputType
    _max?: ScanBuahMaxAggregateInputType
  }

  export type ScanBuahGroupByOutputType = {
    id: string
    predictedBuahName: string
    probability: number
    imageUrl: string
    scannedAt: Date
    userId: string
    buahId: string | null
    _count: ScanBuahCountAggregateOutputType | null
    _avg: ScanBuahAvgAggregateOutputType | null
    _sum: ScanBuahSumAggregateOutputType | null
    _min: ScanBuahMinAggregateOutputType | null
    _max: ScanBuahMaxAggregateOutputType | null
  }

  type GetScanBuahGroupByPayload<T extends ScanBuahGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScanBuahGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScanBuahGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScanBuahGroupByOutputType[P]>
            : GetScalarType<T[P], ScanBuahGroupByOutputType[P]>
        }
      >
    >


  export type ScanBuahSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    predictedBuahName?: boolean
    probability?: boolean
    imageUrl?: boolean
    scannedAt?: boolean
    userId?: boolean
    buahId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    buah?: boolean | ScanBuah$buahArgs<ExtArgs>
  }, ExtArgs["result"]["scanBuah"]>

  export type ScanBuahSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    predictedBuahName?: boolean
    probability?: boolean
    imageUrl?: boolean
    scannedAt?: boolean
    userId?: boolean
    buahId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    buah?: boolean | ScanBuah$buahArgs<ExtArgs>
  }, ExtArgs["result"]["scanBuah"]>

  export type ScanBuahSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    predictedBuahName?: boolean
    probability?: boolean
    imageUrl?: boolean
    scannedAt?: boolean
    userId?: boolean
    buahId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    buah?: boolean | ScanBuah$buahArgs<ExtArgs>
  }, ExtArgs["result"]["scanBuah"]>

  export type ScanBuahSelectScalar = {
    id?: boolean
    predictedBuahName?: boolean
    probability?: boolean
    imageUrl?: boolean
    scannedAt?: boolean
    userId?: boolean
    buahId?: boolean
  }

  export type ScanBuahOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "predictedBuahName" | "probability" | "imageUrl" | "scannedAt" | "userId" | "buahId", ExtArgs["result"]["scanBuah"]>
  export type ScanBuahInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    buah?: boolean | ScanBuah$buahArgs<ExtArgs>
  }
  export type ScanBuahIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    buah?: boolean | ScanBuah$buahArgs<ExtArgs>
  }
  export type ScanBuahIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    buah?: boolean | ScanBuah$buahArgs<ExtArgs>
  }

  export type $ScanBuahPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScanBuah"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      buah: Prisma.$BuahPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      predictedBuahName: string
      probability: number
      imageUrl: string
      scannedAt: Date
      userId: string
      buahId: string | null
    }, ExtArgs["result"]["scanBuah"]>
    composites: {}
  }

  type ScanBuahGetPayload<S extends boolean | null | undefined | ScanBuahDefaultArgs> = $Result.GetResult<Prisma.$ScanBuahPayload, S>

  type ScanBuahCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScanBuahFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScanBuahCountAggregateInputType | true
    }

  export interface ScanBuahDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScanBuah'], meta: { name: 'ScanBuah' } }
    /**
     * Find zero or one ScanBuah that matches the filter.
     * @param {ScanBuahFindUniqueArgs} args - Arguments to find a ScanBuah
     * @example
     * // Get one ScanBuah
     * const scanBuah = await prisma.scanBuah.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScanBuahFindUniqueArgs>(args: SelectSubset<T, ScanBuahFindUniqueArgs<ExtArgs>>): Prisma__ScanBuahClient<$Result.GetResult<Prisma.$ScanBuahPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ScanBuah that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScanBuahFindUniqueOrThrowArgs} args - Arguments to find a ScanBuah
     * @example
     * // Get one ScanBuah
     * const scanBuah = await prisma.scanBuah.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScanBuahFindUniqueOrThrowArgs>(args: SelectSubset<T, ScanBuahFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScanBuahClient<$Result.GetResult<Prisma.$ScanBuahPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScanBuah that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanBuahFindFirstArgs} args - Arguments to find a ScanBuah
     * @example
     * // Get one ScanBuah
     * const scanBuah = await prisma.scanBuah.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScanBuahFindFirstArgs>(args?: SelectSubset<T, ScanBuahFindFirstArgs<ExtArgs>>): Prisma__ScanBuahClient<$Result.GetResult<Prisma.$ScanBuahPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScanBuah that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanBuahFindFirstOrThrowArgs} args - Arguments to find a ScanBuah
     * @example
     * // Get one ScanBuah
     * const scanBuah = await prisma.scanBuah.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScanBuahFindFirstOrThrowArgs>(args?: SelectSubset<T, ScanBuahFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScanBuahClient<$Result.GetResult<Prisma.$ScanBuahPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ScanBuahs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanBuahFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScanBuahs
     * const scanBuahs = await prisma.scanBuah.findMany()
     * 
     * // Get first 10 ScanBuahs
     * const scanBuahs = await prisma.scanBuah.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scanBuahWithIdOnly = await prisma.scanBuah.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScanBuahFindManyArgs>(args?: SelectSubset<T, ScanBuahFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanBuahPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ScanBuah.
     * @param {ScanBuahCreateArgs} args - Arguments to create a ScanBuah.
     * @example
     * // Create one ScanBuah
     * const ScanBuah = await prisma.scanBuah.create({
     *   data: {
     *     // ... data to create a ScanBuah
     *   }
     * })
     * 
     */
    create<T extends ScanBuahCreateArgs>(args: SelectSubset<T, ScanBuahCreateArgs<ExtArgs>>): Prisma__ScanBuahClient<$Result.GetResult<Prisma.$ScanBuahPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ScanBuahs.
     * @param {ScanBuahCreateManyArgs} args - Arguments to create many ScanBuahs.
     * @example
     * // Create many ScanBuahs
     * const scanBuah = await prisma.scanBuah.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScanBuahCreateManyArgs>(args?: SelectSubset<T, ScanBuahCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScanBuahs and returns the data saved in the database.
     * @param {ScanBuahCreateManyAndReturnArgs} args - Arguments to create many ScanBuahs.
     * @example
     * // Create many ScanBuahs
     * const scanBuah = await prisma.scanBuah.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScanBuahs and only return the `id`
     * const scanBuahWithIdOnly = await prisma.scanBuah.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScanBuahCreateManyAndReturnArgs>(args?: SelectSubset<T, ScanBuahCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanBuahPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ScanBuah.
     * @param {ScanBuahDeleteArgs} args - Arguments to delete one ScanBuah.
     * @example
     * // Delete one ScanBuah
     * const ScanBuah = await prisma.scanBuah.delete({
     *   where: {
     *     // ... filter to delete one ScanBuah
     *   }
     * })
     * 
     */
    delete<T extends ScanBuahDeleteArgs>(args: SelectSubset<T, ScanBuahDeleteArgs<ExtArgs>>): Prisma__ScanBuahClient<$Result.GetResult<Prisma.$ScanBuahPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ScanBuah.
     * @param {ScanBuahUpdateArgs} args - Arguments to update one ScanBuah.
     * @example
     * // Update one ScanBuah
     * const scanBuah = await prisma.scanBuah.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScanBuahUpdateArgs>(args: SelectSubset<T, ScanBuahUpdateArgs<ExtArgs>>): Prisma__ScanBuahClient<$Result.GetResult<Prisma.$ScanBuahPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ScanBuahs.
     * @param {ScanBuahDeleteManyArgs} args - Arguments to filter ScanBuahs to delete.
     * @example
     * // Delete a few ScanBuahs
     * const { count } = await prisma.scanBuah.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScanBuahDeleteManyArgs>(args?: SelectSubset<T, ScanBuahDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScanBuahs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanBuahUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScanBuahs
     * const scanBuah = await prisma.scanBuah.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScanBuahUpdateManyArgs>(args: SelectSubset<T, ScanBuahUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScanBuahs and returns the data updated in the database.
     * @param {ScanBuahUpdateManyAndReturnArgs} args - Arguments to update many ScanBuahs.
     * @example
     * // Update many ScanBuahs
     * const scanBuah = await prisma.scanBuah.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ScanBuahs and only return the `id`
     * const scanBuahWithIdOnly = await prisma.scanBuah.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScanBuahUpdateManyAndReturnArgs>(args: SelectSubset<T, ScanBuahUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanBuahPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ScanBuah.
     * @param {ScanBuahUpsertArgs} args - Arguments to update or create a ScanBuah.
     * @example
     * // Update or create a ScanBuah
     * const scanBuah = await prisma.scanBuah.upsert({
     *   create: {
     *     // ... data to create a ScanBuah
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScanBuah we want to update
     *   }
     * })
     */
    upsert<T extends ScanBuahUpsertArgs>(args: SelectSubset<T, ScanBuahUpsertArgs<ExtArgs>>): Prisma__ScanBuahClient<$Result.GetResult<Prisma.$ScanBuahPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ScanBuahs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanBuahCountArgs} args - Arguments to filter ScanBuahs to count.
     * @example
     * // Count the number of ScanBuahs
     * const count = await prisma.scanBuah.count({
     *   where: {
     *     // ... the filter for the ScanBuahs we want to count
     *   }
     * })
    **/
    count<T extends ScanBuahCountArgs>(
      args?: Subset<T, ScanBuahCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScanBuahCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScanBuah.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanBuahAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScanBuahAggregateArgs>(args: Subset<T, ScanBuahAggregateArgs>): Prisma.PrismaPromise<GetScanBuahAggregateType<T>>

    /**
     * Group by ScanBuah.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanBuahGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScanBuahGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScanBuahGroupByArgs['orderBy'] }
        : { orderBy?: ScanBuahGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScanBuahGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScanBuahGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScanBuah model
   */
  readonly fields: ScanBuahFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScanBuah.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScanBuahClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    buah<T extends ScanBuah$buahArgs<ExtArgs> = {}>(args?: Subset<T, ScanBuah$buahArgs<ExtArgs>>): Prisma__BuahClient<$Result.GetResult<Prisma.$BuahPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScanBuah model
   */
  interface ScanBuahFieldRefs {
    readonly id: FieldRef<"ScanBuah", 'String'>
    readonly predictedBuahName: FieldRef<"ScanBuah", 'String'>
    readonly probability: FieldRef<"ScanBuah", 'Float'>
    readonly imageUrl: FieldRef<"ScanBuah", 'String'>
    readonly scannedAt: FieldRef<"ScanBuah", 'DateTime'>
    readonly userId: FieldRef<"ScanBuah", 'String'>
    readonly buahId: FieldRef<"ScanBuah", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ScanBuah findUnique
   */
  export type ScanBuahFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanBuah
     */
    select?: ScanBuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanBuah
     */
    omit?: ScanBuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanBuahInclude<ExtArgs> | null
    /**
     * Filter, which ScanBuah to fetch.
     */
    where: ScanBuahWhereUniqueInput
  }

  /**
   * ScanBuah findUniqueOrThrow
   */
  export type ScanBuahFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanBuah
     */
    select?: ScanBuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanBuah
     */
    omit?: ScanBuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanBuahInclude<ExtArgs> | null
    /**
     * Filter, which ScanBuah to fetch.
     */
    where: ScanBuahWhereUniqueInput
  }

  /**
   * ScanBuah findFirst
   */
  export type ScanBuahFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanBuah
     */
    select?: ScanBuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanBuah
     */
    omit?: ScanBuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanBuahInclude<ExtArgs> | null
    /**
     * Filter, which ScanBuah to fetch.
     */
    where?: ScanBuahWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanBuahs to fetch.
     */
    orderBy?: ScanBuahOrderByWithRelationInput | ScanBuahOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScanBuahs.
     */
    cursor?: ScanBuahWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanBuahs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanBuahs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScanBuahs.
     */
    distinct?: ScanBuahScalarFieldEnum | ScanBuahScalarFieldEnum[]
  }

  /**
   * ScanBuah findFirstOrThrow
   */
  export type ScanBuahFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanBuah
     */
    select?: ScanBuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanBuah
     */
    omit?: ScanBuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanBuahInclude<ExtArgs> | null
    /**
     * Filter, which ScanBuah to fetch.
     */
    where?: ScanBuahWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanBuahs to fetch.
     */
    orderBy?: ScanBuahOrderByWithRelationInput | ScanBuahOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScanBuahs.
     */
    cursor?: ScanBuahWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanBuahs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanBuahs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScanBuahs.
     */
    distinct?: ScanBuahScalarFieldEnum | ScanBuahScalarFieldEnum[]
  }

  /**
   * ScanBuah findMany
   */
  export type ScanBuahFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanBuah
     */
    select?: ScanBuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanBuah
     */
    omit?: ScanBuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanBuahInclude<ExtArgs> | null
    /**
     * Filter, which ScanBuahs to fetch.
     */
    where?: ScanBuahWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanBuahs to fetch.
     */
    orderBy?: ScanBuahOrderByWithRelationInput | ScanBuahOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScanBuahs.
     */
    cursor?: ScanBuahWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanBuahs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanBuahs.
     */
    skip?: number
    distinct?: ScanBuahScalarFieldEnum | ScanBuahScalarFieldEnum[]
  }

  /**
   * ScanBuah create
   */
  export type ScanBuahCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanBuah
     */
    select?: ScanBuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanBuah
     */
    omit?: ScanBuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanBuahInclude<ExtArgs> | null
    /**
     * The data needed to create a ScanBuah.
     */
    data: XOR<ScanBuahCreateInput, ScanBuahUncheckedCreateInput>
  }

  /**
   * ScanBuah createMany
   */
  export type ScanBuahCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScanBuahs.
     */
    data: ScanBuahCreateManyInput | ScanBuahCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScanBuah createManyAndReturn
   */
  export type ScanBuahCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanBuah
     */
    select?: ScanBuahSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScanBuah
     */
    omit?: ScanBuahOmit<ExtArgs> | null
    /**
     * The data used to create many ScanBuahs.
     */
    data: ScanBuahCreateManyInput | ScanBuahCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanBuahIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScanBuah update
   */
  export type ScanBuahUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanBuah
     */
    select?: ScanBuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanBuah
     */
    omit?: ScanBuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanBuahInclude<ExtArgs> | null
    /**
     * The data needed to update a ScanBuah.
     */
    data: XOR<ScanBuahUpdateInput, ScanBuahUncheckedUpdateInput>
    /**
     * Choose, which ScanBuah to update.
     */
    where: ScanBuahWhereUniqueInput
  }

  /**
   * ScanBuah updateMany
   */
  export type ScanBuahUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScanBuahs.
     */
    data: XOR<ScanBuahUpdateManyMutationInput, ScanBuahUncheckedUpdateManyInput>
    /**
     * Filter which ScanBuahs to update
     */
    where?: ScanBuahWhereInput
    /**
     * Limit how many ScanBuahs to update.
     */
    limit?: number
  }

  /**
   * ScanBuah updateManyAndReturn
   */
  export type ScanBuahUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanBuah
     */
    select?: ScanBuahSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScanBuah
     */
    omit?: ScanBuahOmit<ExtArgs> | null
    /**
     * The data used to update ScanBuahs.
     */
    data: XOR<ScanBuahUpdateManyMutationInput, ScanBuahUncheckedUpdateManyInput>
    /**
     * Filter which ScanBuahs to update
     */
    where?: ScanBuahWhereInput
    /**
     * Limit how many ScanBuahs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanBuahIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScanBuah upsert
   */
  export type ScanBuahUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanBuah
     */
    select?: ScanBuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanBuah
     */
    omit?: ScanBuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanBuahInclude<ExtArgs> | null
    /**
     * The filter to search for the ScanBuah to update in case it exists.
     */
    where: ScanBuahWhereUniqueInput
    /**
     * In case the ScanBuah found by the `where` argument doesn't exist, create a new ScanBuah with this data.
     */
    create: XOR<ScanBuahCreateInput, ScanBuahUncheckedCreateInput>
    /**
     * In case the ScanBuah was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScanBuahUpdateInput, ScanBuahUncheckedUpdateInput>
  }

  /**
   * ScanBuah delete
   */
  export type ScanBuahDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanBuah
     */
    select?: ScanBuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanBuah
     */
    omit?: ScanBuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanBuahInclude<ExtArgs> | null
    /**
     * Filter which ScanBuah to delete.
     */
    where: ScanBuahWhereUniqueInput
  }

  /**
   * ScanBuah deleteMany
   */
  export type ScanBuahDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScanBuahs to delete
     */
    where?: ScanBuahWhereInput
    /**
     * Limit how many ScanBuahs to delete.
     */
    limit?: number
  }

  /**
   * ScanBuah.buah
   */
  export type ScanBuah$buahArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Buah
     */
    select?: BuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Buah
     */
    omit?: BuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BuahInclude<ExtArgs> | null
    where?: BuahWhereInput
  }

  /**
   * ScanBuah without action
   */
  export type ScanBuahDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanBuah
     */
    select?: ScanBuahSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanBuah
     */
    omit?: ScanBuahOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanBuahInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BuahScalarFieldEnum: {
    id: 'id',
    namaBuah: 'namaBuah',
    manfaat: 'manfaat',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BuahScalarFieldEnum = (typeof BuahScalarFieldEnum)[keyof typeof BuahScalarFieldEnum]


  export const ScanBuahScalarFieldEnum: {
    id: 'id',
    predictedBuahName: 'predictedBuahName',
    probability: 'probability',
    imageUrl: 'imageUrl',
    scannedAt: 'scannedAt',
    userId: 'userId',
    buahId: 'buahId'
  };

  export type ScanBuahScalarFieldEnum = (typeof ScanBuahScalarFieldEnum)[keyof typeof ScanBuahScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    ScanBuah?: ScanBuahListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ScanBuah?: ScanBuahOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    ScanBuah?: ScanBuahListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type BuahWhereInput = {
    AND?: BuahWhereInput | BuahWhereInput[]
    OR?: BuahWhereInput[]
    NOT?: BuahWhereInput | BuahWhereInput[]
    id?: StringFilter<"Buah"> | string
    namaBuah?: StringFilter<"Buah"> | string
    manfaat?: StringFilter<"Buah"> | string
    createdAt?: DateTimeFilter<"Buah"> | Date | string
    updatedAt?: DateTimeFilter<"Buah"> | Date | string
    ScanBuah?: ScanBuahListRelationFilter
  }

  export type BuahOrderByWithRelationInput = {
    id?: SortOrder
    namaBuah?: SortOrder
    manfaat?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ScanBuah?: ScanBuahOrderByRelationAggregateInput
  }

  export type BuahWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    namaBuah?: string
    AND?: BuahWhereInput | BuahWhereInput[]
    OR?: BuahWhereInput[]
    NOT?: BuahWhereInput | BuahWhereInput[]
    manfaat?: StringFilter<"Buah"> | string
    createdAt?: DateTimeFilter<"Buah"> | Date | string
    updatedAt?: DateTimeFilter<"Buah"> | Date | string
    ScanBuah?: ScanBuahListRelationFilter
  }, "id" | "namaBuah">

  export type BuahOrderByWithAggregationInput = {
    id?: SortOrder
    namaBuah?: SortOrder
    manfaat?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BuahCountOrderByAggregateInput
    _max?: BuahMaxOrderByAggregateInput
    _min?: BuahMinOrderByAggregateInput
  }

  export type BuahScalarWhereWithAggregatesInput = {
    AND?: BuahScalarWhereWithAggregatesInput | BuahScalarWhereWithAggregatesInput[]
    OR?: BuahScalarWhereWithAggregatesInput[]
    NOT?: BuahScalarWhereWithAggregatesInput | BuahScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Buah"> | string
    namaBuah?: StringWithAggregatesFilter<"Buah"> | string
    manfaat?: StringWithAggregatesFilter<"Buah"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Buah"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Buah"> | Date | string
  }

  export type ScanBuahWhereInput = {
    AND?: ScanBuahWhereInput | ScanBuahWhereInput[]
    OR?: ScanBuahWhereInput[]
    NOT?: ScanBuahWhereInput | ScanBuahWhereInput[]
    id?: StringFilter<"ScanBuah"> | string
    predictedBuahName?: StringFilter<"ScanBuah"> | string
    probability?: FloatFilter<"ScanBuah"> | number
    imageUrl?: StringFilter<"ScanBuah"> | string
    scannedAt?: DateTimeFilter<"ScanBuah"> | Date | string
    userId?: StringFilter<"ScanBuah"> | string
    buahId?: StringNullableFilter<"ScanBuah"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    buah?: XOR<BuahNullableScalarRelationFilter, BuahWhereInput> | null
  }

  export type ScanBuahOrderByWithRelationInput = {
    id?: SortOrder
    predictedBuahName?: SortOrder
    probability?: SortOrder
    imageUrl?: SortOrder
    scannedAt?: SortOrder
    userId?: SortOrder
    buahId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    buah?: BuahOrderByWithRelationInput
  }

  export type ScanBuahWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScanBuahWhereInput | ScanBuahWhereInput[]
    OR?: ScanBuahWhereInput[]
    NOT?: ScanBuahWhereInput | ScanBuahWhereInput[]
    predictedBuahName?: StringFilter<"ScanBuah"> | string
    probability?: FloatFilter<"ScanBuah"> | number
    imageUrl?: StringFilter<"ScanBuah"> | string
    scannedAt?: DateTimeFilter<"ScanBuah"> | Date | string
    userId?: StringFilter<"ScanBuah"> | string
    buahId?: StringNullableFilter<"ScanBuah"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    buah?: XOR<BuahNullableScalarRelationFilter, BuahWhereInput> | null
  }, "id">

  export type ScanBuahOrderByWithAggregationInput = {
    id?: SortOrder
    predictedBuahName?: SortOrder
    probability?: SortOrder
    imageUrl?: SortOrder
    scannedAt?: SortOrder
    userId?: SortOrder
    buahId?: SortOrderInput | SortOrder
    _count?: ScanBuahCountOrderByAggregateInput
    _avg?: ScanBuahAvgOrderByAggregateInput
    _max?: ScanBuahMaxOrderByAggregateInput
    _min?: ScanBuahMinOrderByAggregateInput
    _sum?: ScanBuahSumOrderByAggregateInput
  }

  export type ScanBuahScalarWhereWithAggregatesInput = {
    AND?: ScanBuahScalarWhereWithAggregatesInput | ScanBuahScalarWhereWithAggregatesInput[]
    OR?: ScanBuahScalarWhereWithAggregatesInput[]
    NOT?: ScanBuahScalarWhereWithAggregatesInput | ScanBuahScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ScanBuah"> | string
    predictedBuahName?: StringWithAggregatesFilter<"ScanBuah"> | string
    probability?: FloatWithAggregatesFilter<"ScanBuah"> | number
    imageUrl?: StringWithAggregatesFilter<"ScanBuah"> | string
    scannedAt?: DateTimeWithAggregatesFilter<"ScanBuah"> | Date | string
    userId?: StringWithAggregatesFilter<"ScanBuah"> | string
    buahId?: StringNullableWithAggregatesFilter<"ScanBuah"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ScanBuah?: ScanBuahCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ScanBuah?: ScanBuahUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ScanBuah?: ScanBuahUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ScanBuah?: ScanBuahUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuahCreateInput = {
    id?: string
    namaBuah: string
    manfaat: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ScanBuah?: ScanBuahCreateNestedManyWithoutBuahInput
  }

  export type BuahUncheckedCreateInput = {
    id?: string
    namaBuah: string
    manfaat: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ScanBuah?: ScanBuahUncheckedCreateNestedManyWithoutBuahInput
  }

  export type BuahUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaBuah?: StringFieldUpdateOperationsInput | string
    manfaat?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ScanBuah?: ScanBuahUpdateManyWithoutBuahNestedInput
  }

  export type BuahUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaBuah?: StringFieldUpdateOperationsInput | string
    manfaat?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ScanBuah?: ScanBuahUncheckedUpdateManyWithoutBuahNestedInput
  }

  export type BuahCreateManyInput = {
    id?: string
    namaBuah: string
    manfaat: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BuahUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaBuah?: StringFieldUpdateOperationsInput | string
    manfaat?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuahUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaBuah?: StringFieldUpdateOperationsInput | string
    manfaat?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScanBuahCreateInput = {
    id?: string
    predictedBuahName: string
    probability: number
    imageUrl: string
    scannedAt?: Date | string
    user: UserCreateNestedOneWithoutScanBuahInput
    buah?: BuahCreateNestedOneWithoutScanBuahInput
  }

  export type ScanBuahUncheckedCreateInput = {
    id?: string
    predictedBuahName: string
    probability: number
    imageUrl: string
    scannedAt?: Date | string
    userId: string
    buahId?: string | null
  }

  export type ScanBuahUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    predictedBuahName?: StringFieldUpdateOperationsInput | string
    probability?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScanBuahNestedInput
    buah?: BuahUpdateOneWithoutScanBuahNestedInput
  }

  export type ScanBuahUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    predictedBuahName?: StringFieldUpdateOperationsInput | string
    probability?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    buahId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScanBuahCreateManyInput = {
    id?: string
    predictedBuahName: string
    probability: number
    imageUrl: string
    scannedAt?: Date | string
    userId: string
    buahId?: string | null
  }

  export type ScanBuahUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    predictedBuahName?: StringFieldUpdateOperationsInput | string
    probability?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScanBuahUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    predictedBuahName?: StringFieldUpdateOperationsInput | string
    probability?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    buahId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ScanBuahListRelationFilter = {
    every?: ScanBuahWhereInput
    some?: ScanBuahWhereInput
    none?: ScanBuahWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ScanBuahOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BuahCountOrderByAggregateInput = {
    id?: SortOrder
    namaBuah?: SortOrder
    manfaat?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuahMaxOrderByAggregateInput = {
    id?: SortOrder
    namaBuah?: SortOrder
    manfaat?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuahMinOrderByAggregateInput = {
    id?: SortOrder
    namaBuah?: SortOrder
    manfaat?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type BuahNullableScalarRelationFilter = {
    is?: BuahWhereInput | null
    isNot?: BuahWhereInput | null
  }

  export type ScanBuahCountOrderByAggregateInput = {
    id?: SortOrder
    predictedBuahName?: SortOrder
    probability?: SortOrder
    imageUrl?: SortOrder
    scannedAt?: SortOrder
    userId?: SortOrder
    buahId?: SortOrder
  }

  export type ScanBuahAvgOrderByAggregateInput = {
    probability?: SortOrder
  }

  export type ScanBuahMaxOrderByAggregateInput = {
    id?: SortOrder
    predictedBuahName?: SortOrder
    probability?: SortOrder
    imageUrl?: SortOrder
    scannedAt?: SortOrder
    userId?: SortOrder
    buahId?: SortOrder
  }

  export type ScanBuahMinOrderByAggregateInput = {
    id?: SortOrder
    predictedBuahName?: SortOrder
    probability?: SortOrder
    imageUrl?: SortOrder
    scannedAt?: SortOrder
    userId?: SortOrder
    buahId?: SortOrder
  }

  export type ScanBuahSumOrderByAggregateInput = {
    probability?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ScanBuahCreateNestedManyWithoutUserInput = {
    create?: XOR<ScanBuahCreateWithoutUserInput, ScanBuahUncheckedCreateWithoutUserInput> | ScanBuahCreateWithoutUserInput[] | ScanBuahUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScanBuahCreateOrConnectWithoutUserInput | ScanBuahCreateOrConnectWithoutUserInput[]
    createMany?: ScanBuahCreateManyUserInputEnvelope
    connect?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
  }

  export type ScanBuahUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ScanBuahCreateWithoutUserInput, ScanBuahUncheckedCreateWithoutUserInput> | ScanBuahCreateWithoutUserInput[] | ScanBuahUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScanBuahCreateOrConnectWithoutUserInput | ScanBuahCreateOrConnectWithoutUserInput[]
    createMany?: ScanBuahCreateManyUserInputEnvelope
    connect?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ScanBuahUpdateManyWithoutUserNestedInput = {
    create?: XOR<ScanBuahCreateWithoutUserInput, ScanBuahUncheckedCreateWithoutUserInput> | ScanBuahCreateWithoutUserInput[] | ScanBuahUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScanBuahCreateOrConnectWithoutUserInput | ScanBuahCreateOrConnectWithoutUserInput[]
    upsert?: ScanBuahUpsertWithWhereUniqueWithoutUserInput | ScanBuahUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ScanBuahCreateManyUserInputEnvelope
    set?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
    disconnect?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
    delete?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
    connect?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
    update?: ScanBuahUpdateWithWhereUniqueWithoutUserInput | ScanBuahUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ScanBuahUpdateManyWithWhereWithoutUserInput | ScanBuahUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ScanBuahScalarWhereInput | ScanBuahScalarWhereInput[]
  }

  export type ScanBuahUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ScanBuahCreateWithoutUserInput, ScanBuahUncheckedCreateWithoutUserInput> | ScanBuahCreateWithoutUserInput[] | ScanBuahUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScanBuahCreateOrConnectWithoutUserInput | ScanBuahCreateOrConnectWithoutUserInput[]
    upsert?: ScanBuahUpsertWithWhereUniqueWithoutUserInput | ScanBuahUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ScanBuahCreateManyUserInputEnvelope
    set?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
    disconnect?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
    delete?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
    connect?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
    update?: ScanBuahUpdateWithWhereUniqueWithoutUserInput | ScanBuahUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ScanBuahUpdateManyWithWhereWithoutUserInput | ScanBuahUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ScanBuahScalarWhereInput | ScanBuahScalarWhereInput[]
  }

  export type ScanBuahCreateNestedManyWithoutBuahInput = {
    create?: XOR<ScanBuahCreateWithoutBuahInput, ScanBuahUncheckedCreateWithoutBuahInput> | ScanBuahCreateWithoutBuahInput[] | ScanBuahUncheckedCreateWithoutBuahInput[]
    connectOrCreate?: ScanBuahCreateOrConnectWithoutBuahInput | ScanBuahCreateOrConnectWithoutBuahInput[]
    createMany?: ScanBuahCreateManyBuahInputEnvelope
    connect?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
  }

  export type ScanBuahUncheckedCreateNestedManyWithoutBuahInput = {
    create?: XOR<ScanBuahCreateWithoutBuahInput, ScanBuahUncheckedCreateWithoutBuahInput> | ScanBuahCreateWithoutBuahInput[] | ScanBuahUncheckedCreateWithoutBuahInput[]
    connectOrCreate?: ScanBuahCreateOrConnectWithoutBuahInput | ScanBuahCreateOrConnectWithoutBuahInput[]
    createMany?: ScanBuahCreateManyBuahInputEnvelope
    connect?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
  }

  export type ScanBuahUpdateManyWithoutBuahNestedInput = {
    create?: XOR<ScanBuahCreateWithoutBuahInput, ScanBuahUncheckedCreateWithoutBuahInput> | ScanBuahCreateWithoutBuahInput[] | ScanBuahUncheckedCreateWithoutBuahInput[]
    connectOrCreate?: ScanBuahCreateOrConnectWithoutBuahInput | ScanBuahCreateOrConnectWithoutBuahInput[]
    upsert?: ScanBuahUpsertWithWhereUniqueWithoutBuahInput | ScanBuahUpsertWithWhereUniqueWithoutBuahInput[]
    createMany?: ScanBuahCreateManyBuahInputEnvelope
    set?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
    disconnect?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
    delete?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
    connect?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
    update?: ScanBuahUpdateWithWhereUniqueWithoutBuahInput | ScanBuahUpdateWithWhereUniqueWithoutBuahInput[]
    updateMany?: ScanBuahUpdateManyWithWhereWithoutBuahInput | ScanBuahUpdateManyWithWhereWithoutBuahInput[]
    deleteMany?: ScanBuahScalarWhereInput | ScanBuahScalarWhereInput[]
  }

  export type ScanBuahUncheckedUpdateManyWithoutBuahNestedInput = {
    create?: XOR<ScanBuahCreateWithoutBuahInput, ScanBuahUncheckedCreateWithoutBuahInput> | ScanBuahCreateWithoutBuahInput[] | ScanBuahUncheckedCreateWithoutBuahInput[]
    connectOrCreate?: ScanBuahCreateOrConnectWithoutBuahInput | ScanBuahCreateOrConnectWithoutBuahInput[]
    upsert?: ScanBuahUpsertWithWhereUniqueWithoutBuahInput | ScanBuahUpsertWithWhereUniqueWithoutBuahInput[]
    createMany?: ScanBuahCreateManyBuahInputEnvelope
    set?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
    disconnect?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
    delete?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
    connect?: ScanBuahWhereUniqueInput | ScanBuahWhereUniqueInput[]
    update?: ScanBuahUpdateWithWhereUniqueWithoutBuahInput | ScanBuahUpdateWithWhereUniqueWithoutBuahInput[]
    updateMany?: ScanBuahUpdateManyWithWhereWithoutBuahInput | ScanBuahUpdateManyWithWhereWithoutBuahInput[]
    deleteMany?: ScanBuahScalarWhereInput | ScanBuahScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutScanBuahInput = {
    create?: XOR<UserCreateWithoutScanBuahInput, UserUncheckedCreateWithoutScanBuahInput>
    connectOrCreate?: UserCreateOrConnectWithoutScanBuahInput
    connect?: UserWhereUniqueInput
  }

  export type BuahCreateNestedOneWithoutScanBuahInput = {
    create?: XOR<BuahCreateWithoutScanBuahInput, BuahUncheckedCreateWithoutScanBuahInput>
    connectOrCreate?: BuahCreateOrConnectWithoutScanBuahInput
    connect?: BuahWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutScanBuahNestedInput = {
    create?: XOR<UserCreateWithoutScanBuahInput, UserUncheckedCreateWithoutScanBuahInput>
    connectOrCreate?: UserCreateOrConnectWithoutScanBuahInput
    upsert?: UserUpsertWithoutScanBuahInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutScanBuahInput, UserUpdateWithoutScanBuahInput>, UserUncheckedUpdateWithoutScanBuahInput>
  }

  export type BuahUpdateOneWithoutScanBuahNestedInput = {
    create?: XOR<BuahCreateWithoutScanBuahInput, BuahUncheckedCreateWithoutScanBuahInput>
    connectOrCreate?: BuahCreateOrConnectWithoutScanBuahInput
    upsert?: BuahUpsertWithoutScanBuahInput
    disconnect?: BuahWhereInput | boolean
    delete?: BuahWhereInput | boolean
    connect?: BuahWhereUniqueInput
    update?: XOR<XOR<BuahUpdateToOneWithWhereWithoutScanBuahInput, BuahUpdateWithoutScanBuahInput>, BuahUncheckedUpdateWithoutScanBuahInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ScanBuahCreateWithoutUserInput = {
    id?: string
    predictedBuahName: string
    probability: number
    imageUrl: string
    scannedAt?: Date | string
    buah?: BuahCreateNestedOneWithoutScanBuahInput
  }

  export type ScanBuahUncheckedCreateWithoutUserInput = {
    id?: string
    predictedBuahName: string
    probability: number
    imageUrl: string
    scannedAt?: Date | string
    buahId?: string | null
  }

  export type ScanBuahCreateOrConnectWithoutUserInput = {
    where: ScanBuahWhereUniqueInput
    create: XOR<ScanBuahCreateWithoutUserInput, ScanBuahUncheckedCreateWithoutUserInput>
  }

  export type ScanBuahCreateManyUserInputEnvelope = {
    data: ScanBuahCreateManyUserInput | ScanBuahCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ScanBuahUpsertWithWhereUniqueWithoutUserInput = {
    where: ScanBuahWhereUniqueInput
    update: XOR<ScanBuahUpdateWithoutUserInput, ScanBuahUncheckedUpdateWithoutUserInput>
    create: XOR<ScanBuahCreateWithoutUserInput, ScanBuahUncheckedCreateWithoutUserInput>
  }

  export type ScanBuahUpdateWithWhereUniqueWithoutUserInput = {
    where: ScanBuahWhereUniqueInput
    data: XOR<ScanBuahUpdateWithoutUserInput, ScanBuahUncheckedUpdateWithoutUserInput>
  }

  export type ScanBuahUpdateManyWithWhereWithoutUserInput = {
    where: ScanBuahScalarWhereInput
    data: XOR<ScanBuahUpdateManyMutationInput, ScanBuahUncheckedUpdateManyWithoutUserInput>
  }

  export type ScanBuahScalarWhereInput = {
    AND?: ScanBuahScalarWhereInput | ScanBuahScalarWhereInput[]
    OR?: ScanBuahScalarWhereInput[]
    NOT?: ScanBuahScalarWhereInput | ScanBuahScalarWhereInput[]
    id?: StringFilter<"ScanBuah"> | string
    predictedBuahName?: StringFilter<"ScanBuah"> | string
    probability?: FloatFilter<"ScanBuah"> | number
    imageUrl?: StringFilter<"ScanBuah"> | string
    scannedAt?: DateTimeFilter<"ScanBuah"> | Date | string
    userId?: StringFilter<"ScanBuah"> | string
    buahId?: StringNullableFilter<"ScanBuah"> | string | null
  }

  export type ScanBuahCreateWithoutBuahInput = {
    id?: string
    predictedBuahName: string
    probability: number
    imageUrl: string
    scannedAt?: Date | string
    user: UserCreateNestedOneWithoutScanBuahInput
  }

  export type ScanBuahUncheckedCreateWithoutBuahInput = {
    id?: string
    predictedBuahName: string
    probability: number
    imageUrl: string
    scannedAt?: Date | string
    userId: string
  }

  export type ScanBuahCreateOrConnectWithoutBuahInput = {
    where: ScanBuahWhereUniqueInput
    create: XOR<ScanBuahCreateWithoutBuahInput, ScanBuahUncheckedCreateWithoutBuahInput>
  }

  export type ScanBuahCreateManyBuahInputEnvelope = {
    data: ScanBuahCreateManyBuahInput | ScanBuahCreateManyBuahInput[]
    skipDuplicates?: boolean
  }

  export type ScanBuahUpsertWithWhereUniqueWithoutBuahInput = {
    where: ScanBuahWhereUniqueInput
    update: XOR<ScanBuahUpdateWithoutBuahInput, ScanBuahUncheckedUpdateWithoutBuahInput>
    create: XOR<ScanBuahCreateWithoutBuahInput, ScanBuahUncheckedCreateWithoutBuahInput>
  }

  export type ScanBuahUpdateWithWhereUniqueWithoutBuahInput = {
    where: ScanBuahWhereUniqueInput
    data: XOR<ScanBuahUpdateWithoutBuahInput, ScanBuahUncheckedUpdateWithoutBuahInput>
  }

  export type ScanBuahUpdateManyWithWhereWithoutBuahInput = {
    where: ScanBuahScalarWhereInput
    data: XOR<ScanBuahUpdateManyMutationInput, ScanBuahUncheckedUpdateManyWithoutBuahInput>
  }

  export type UserCreateWithoutScanBuahInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutScanBuahInput = {
    id?: string
    email: string
    passwordHash: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutScanBuahInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutScanBuahInput, UserUncheckedCreateWithoutScanBuahInput>
  }

  export type BuahCreateWithoutScanBuahInput = {
    id?: string
    namaBuah: string
    manfaat: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BuahUncheckedCreateWithoutScanBuahInput = {
    id?: string
    namaBuah: string
    manfaat: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BuahCreateOrConnectWithoutScanBuahInput = {
    where: BuahWhereUniqueInput
    create: XOR<BuahCreateWithoutScanBuahInput, BuahUncheckedCreateWithoutScanBuahInput>
  }

  export type UserUpsertWithoutScanBuahInput = {
    update: XOR<UserUpdateWithoutScanBuahInput, UserUncheckedUpdateWithoutScanBuahInput>
    create: XOR<UserCreateWithoutScanBuahInput, UserUncheckedCreateWithoutScanBuahInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutScanBuahInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutScanBuahInput, UserUncheckedUpdateWithoutScanBuahInput>
  }

  export type UserUpdateWithoutScanBuahInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutScanBuahInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuahUpsertWithoutScanBuahInput = {
    update: XOR<BuahUpdateWithoutScanBuahInput, BuahUncheckedUpdateWithoutScanBuahInput>
    create: XOR<BuahCreateWithoutScanBuahInput, BuahUncheckedCreateWithoutScanBuahInput>
    where?: BuahWhereInput
  }

  export type BuahUpdateToOneWithWhereWithoutScanBuahInput = {
    where?: BuahWhereInput
    data: XOR<BuahUpdateWithoutScanBuahInput, BuahUncheckedUpdateWithoutScanBuahInput>
  }

  export type BuahUpdateWithoutScanBuahInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaBuah?: StringFieldUpdateOperationsInput | string
    manfaat?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuahUncheckedUpdateWithoutScanBuahInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaBuah?: StringFieldUpdateOperationsInput | string
    manfaat?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScanBuahCreateManyUserInput = {
    id?: string
    predictedBuahName: string
    probability: number
    imageUrl: string
    scannedAt?: Date | string
    buahId?: string | null
  }

  export type ScanBuahUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    predictedBuahName?: StringFieldUpdateOperationsInput | string
    probability?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buah?: BuahUpdateOneWithoutScanBuahNestedInput
  }

  export type ScanBuahUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    predictedBuahName?: StringFieldUpdateOperationsInput | string
    probability?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buahId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScanBuahUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    predictedBuahName?: StringFieldUpdateOperationsInput | string
    probability?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buahId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScanBuahCreateManyBuahInput = {
    id?: string
    predictedBuahName: string
    probability: number
    imageUrl: string
    scannedAt?: Date | string
    userId: string
  }

  export type ScanBuahUpdateWithoutBuahInput = {
    id?: StringFieldUpdateOperationsInput | string
    predictedBuahName?: StringFieldUpdateOperationsInput | string
    probability?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutScanBuahNestedInput
  }

  export type ScanBuahUncheckedUpdateWithoutBuahInput = {
    id?: StringFieldUpdateOperationsInput | string
    predictedBuahName?: StringFieldUpdateOperationsInput | string
    probability?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ScanBuahUncheckedUpdateManyWithoutBuahInput = {
    id?: StringFieldUpdateOperationsInput | string
    predictedBuahName?: StringFieldUpdateOperationsInput | string
    probability?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}