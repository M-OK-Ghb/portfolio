import { getAssetsPath } from "../../config/config";
import axios from "axios";
import { DomFactorySchema } from "../../type/type";


// 継承用クラスを定義
export default abstract class DOMFactory {

    constructor () {
        console.log("[class] - DOMFactory.setup");
    };

    public async createDOM (callback: CallableFunction, file: string) {

        // jsonデータを取得
        axios({
            method: "get",
            url: `${getAssetsPath("json") + file}`,
            responseType: "json"
        })
        .then((res) => {
            // コールバック関数の引数にレスポンス結果を渡す
            callback(res.data);
        });
    };
};