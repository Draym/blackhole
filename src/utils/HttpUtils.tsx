export default class HttpUtils {
    static async get<T>(url: string, success: (result: T) => any, failure: ((error: any) => any) | null): Promise<any> {
        console.log("url: ", url);
        return fetch(url)
            .then((response) => response.json())
            .then((result) => {
                console.log("json: ", result)
                return success(result)
            })
            .catch((error) => {
                if (failure != null) {
                    failure(error)
                } else console.log(error)
            });
    }
}