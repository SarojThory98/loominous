import 'dotenv/config'
import initDB from './config/db.config'
import App from './app'
import {SecretsManagerClient, GetSecretValueCommand} from '@aws-sdk/client-secrets-manager'

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'uat') {
    const secret_name = 'loominous_' + process.env.NODE_ENV

    const client = new SecretsManagerClient({
        region: 'ap-southeast-1',
    })

    let response
    ;(async () => {
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: 'AWSCURRENT',
            }),
        )

        const secret = JSON.parse(response.SecretString)

        console.log(typeof process.env)

        for (const [key, value] of Object.entries(secret)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: Unreachable code error
            process.env[key] = value
        }

        new initDB()
        const app = new App()
        app.listen()
    })().catch((err) => {
        console.error('Unable to start the server : Error ', err)
    })
} else {
    new initDB()
    const app = new App()
    app.listen()
}
