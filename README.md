# Dashboards Microservice

This is an application dashboards microservice from Pip.Services library. 
It provides guidance to application users: introduces about application features, tells about new version and so on.
Each dashboard:
- Can be written in multiple languages
- Can include one or more pages with title, text and a picture
- Supports editing lifecycle via status tracking

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca, AWS Lambda
* Persistence: In-Memory, Flat Files, MongoDB

This microservice has dependencies on the following microservices:
- [pip-services-attachments](https://github.com/pip-services-content/pip-services-attachments-node) - to reference pictures and documents associates with dashboards

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Dashboard](doc/Development.md)
* [Configuration Dashboard](doc/Configuration.md)
* [Deployment Dashboard](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-content/pip-clients-dashboards-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)

##  Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Seneca, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
export class TileSizeV1 {
    public static readonly Small = "small";
    public static readonly Medium = "medium";
    public static readonly Large = "large";
}

cexport class TileV1 {
    public title?: string;
    public index: number;
    public color: string;
    public size: string;
    public params?: any;
}

export class TileGroupV1 {
    public title?: string;
    public index: number;
    public tiles?: TileV1[];
}

export class DashboardV1 implements IStringIdentifiable {
    /* Identification */
    public id: string;
    public user_id: string;
    public app: string;
    public kind?: string;

    /* Content */
    public groups: TileGroupV1[];
}

interface IDashboardsV1 {
    getDashboards(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<DashboardV1>) => void): void;

    getDashboard(correlationId: string, userId: string, app: string, kind: string,
        callback: (err: any, dashboard: DashboardV1) => void): void;

    setDashboard(correlationId: string, dashboard: DashboardV1,
        callback: (err: any, dashboard: DashboardV1) => void): void;

    deleteDashboards(correlationId: string, filter: FilterParams,
        callback: (err: any) => void): void;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-content/pip-services-dashboards-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yaml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yaml** file. 

Example of microservice configuration
```yaml
---
- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "pip-services-dashboards:persistence:file:default:1.0"
  path: "./data/dashboards.json"

- descriptor: "pip-services-dashboards:controller:default:default:1.0"

- descriptor: "pip-services-attachments:client:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8082

- descriptor: "pip-services-dashboards:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Dashboard](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-dashboards-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-dashboards-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.DashboardsHttpClientV1(config);

// Connect to the microservice
client.open(null, function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Get a dashboard
client.getDashboard(
    null,
    '123', 'Test App 1', 'default',
    function (err, dashboard) {
        ...
    }
);
```

```javascript
// Sets an updated dashboard
client.setDashboard(
    null,
    dashboard,
    function(err, dashboard) {
        ...    
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

