import { MessageType } from "../utils/MessageTypes";

export default async (req, res, next) => {
    let oldSend = res.send
    res.send = (data) => {
        let response = {};

        if (res.statusCode === 200) {
            response = {
                isSucceed: true,
                data: JSON.parse(data),
                messages: null
            }
        } else if (res.statusCode === 400) {
            response = {
                isSucceed: false,
                data: null,
                messages: [
                    {
                        ...JSON.parse(data),
                        type: MessageType.error
                    }
                ]
            }
        }

        res.send = oldSend
        return res.send(response)
    }
    next()
}