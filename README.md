# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

Some personal modifications are:

- Git hooks with [Husky](https://typicode.github.io/husky/), running ESLint, Prettier and Tests on every commit.
- Created a directory for Architecture Decision Records, as [described by Michael Nygard](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions).
- Open API documentation with [redoc-cli](https://github.com/Redocly/redoc).
- CloudWatch Alerts with [serverless-plugin-aws-alerts](https://github.com/ACloudGuru/serverless-plugin-aws-alerts).
- Prune of Old Lambda Versions with [serverless-prune-plugin](https://github.com/claygregory/serverless-prune-plugin).
- [aws-vault](https://github.com/99designs/aws-vault) for using securely store and access AWS credentials in a development environment.
- [mermaid](https://mermaid.js.org/intro/) for rendering graphs in markdown files
- [httpie](https://github.com/httpie/httpie) http client for the terminal (like curl just better)

## Installation/deployment instructions

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS
- Run `npx sls deploy --aws-profile <profile> --stage <stage>` to use the sls from node_module
- Run `yarn sls <profile> <deploy | remove> <stage>` to securely deploy or remove to AWS using aws-vault

## Test your service

This template contains a single lambda function triggered by an HTTP request made on the provisioned API Gateway REST API `/hello` route with `POST` method. The request body must be provided as `application/json`. The body structure is tested by API Gateway against `src/functions/hello/schema.ts` JSON-Schema definition: it must contain the `name` property.

- requesting any other path than `/hello` with any other method than `POST` will result in API Gateway returning a `403` HTTP error code
- sending a `POST` request to `/hello` with a payload **not** containing a string property named `name` will result in API Gateway returning a `400` HTTP error code
- sending a `POST` request to `/hello` with a payload containing a string property named `name` will result in API Gateway returning a `200` HTTP status code with a message saluting the provided name and the detailed event processed by the lambda

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. You should protect this endpoint with the authentication method of your choice.

### Locally

In order to test the hello function locally, run the following command:

- `yarn sls invoke local -f hello --path src/functions/hello/mock.json`

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request POST 'https://myApiEndpoint/dev/hello' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Frederic"
}'
```
Another way is to use `httpie`:

```
https https://myApiEndpoint/play/hello < src/functions/hello/mock.json
```

## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├── src
│   ├── functions            # Lambda configuration and source code folder
│   │   ├── hello
│   │   │   ├── handler.ts   # `Hello` lambda source code
│   │   │   ├── index.ts     # `Hello` lambda Serverless configuration
│   │   │   ├── mock.json    # `Hello` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts    # `Hello` lambda input event JSON-Schema
│   │   │
│   │   └── index.ts         # Import/export of all lambda configurations
│   │
│   └── libs                 # Lambda shared code
│       └── apiGateway.ts    # API Gateway specific helpers
│
├── package.json
├── serverless.ts            # Serverless service file
├── tsconfig.json            # Typescript compiler configuration
└── webpack.config.js        # Webpack configuration
```

### 3rd party librairies

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
- [redoc-cli](https://github.com/Redocly/redoc) - provides a tool to configure and write our documentation using [OpenAPI Specification](https://swagger.io/specification).
- [serverless-prune-plugin](https://github.com/claygregory/serverless-prune-plugin) - prunes old lambda versions.
- [serverless-plugin-aws-alerts](https://github.com/ACloudGuru/serverless-plugin-aws-alerts) - creates alerts automatically in CloudWatch.


### Skirmish

#### Mermaid example
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
