export default class Service {
    #url

    constructor({ url }) {
        this.#url = url
    }

    async uplodaFile({ fileName, fileBuffer }) {
        const formData = new FormData()
        formData.append(fileName, fileBuffer)

        console.log('Uploading file', fileName)

        const response = await fetch(this.#url, 
            { 
                method: 'POST', 
                body: formData
            }
        )

        console.assert(response.ok, 'Response is not ok', response)

        return response
    }
}