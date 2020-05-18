import { MessageType } from "../utils/MessageTypes";

export default async (req, res, next) => {
    let oldSend = res.send
    res.send = (data) => {
        let response = {};


        //         data: null
        // description: "Usuário ou senha inválidos!"
        // descriptionType: "Error"
        // stackTrace: null
        // type: 4

        if (res.statusCode === 200) {
            response = {
                isSucceed: true,
                data: JSON.parse(data),
                messages: null
            }
        } else if (res.statusCode === 400) {
            res.statusCode = 200;
            response = {
                isSucceed: false,
                data: null,
                messages: [
                    {
                        ...JSON.parse(data),
                        type: MessageType.error,
                        data: null,
                        descriptionType: 'Error',
                        stackTrace: null
                    }
                ]
            }
        }

        res.send = oldSend
        return res.send(response)
    }
    next()
}