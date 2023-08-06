import { sign } from "crypto";
import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI as string;
const options = {}


class Singleton {
    private static _instance: Singleton;
    private client: MongoClient;
    private clientPromise: Promise<MongoClient>;

    private constructor() {
        this.client = new MongoClient(URI, options);
        this.clientPromise =  this.client.connect();
    }

    public static instance() {
        if(!Singleton._instance) {
            Singleton._instance = new Singleton();
        }
        return Singleton._instance.clientPromise;
    }
}

const clientPromise = Singleton.instance;

export default clientPromise;