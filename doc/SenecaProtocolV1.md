# Seneca Protocol (version 1) <br/> Dashboards Microservice

Dashboards microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    type: 'tcp', // Microservice seneca protocol
    localhost: 'localhost', // Microservice localhost
    port: 8080, // Microservice seneca port
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'dashboards',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [TileV1 class](#class1)
* [TileGroupV1 class](#class2)
* [DashboardV1 class](#class3)
* [cmd: 'get_dashboards'](#operation1)
* [cmd: 'get_dashboard'](#operation2)
* [cmd: 'set_dashboard'](#operation3)
* [cmd: 'delete_dashboards'](#operation4)

## Data types

### <a name="class1"></a> TileV1 class

Contains a single tile from a tile group

**Properties:**
- title: string - tile title
- index: number - tile index within its group
- size: string - tile size
- color: string - background color
- params: any - tile configuration parameters

### <a name="class2"></a> TileGroupV1 class

Contains a group of tiles from a dashboard

**Properties:**
- title: string - group title
- index: number - group index within dashboard
- tiles: TileV1[] - tiles from this group

### <a name="class3"></a> DashboardV1 class

Represents an application dashboard. 

**Properties:**
- id: string - unique dashboard id
- user_id: string - owner id
- app: string - application name
- kind: string - (optional) id to choose from multiple dashboards within the same app
- groups: TileGroupV1[] - groups of tiles

## Operations

### <a name="operation1"></a> Cmd: 'get_dashboards'

Retrieves a list of dashboards by specified criteria

**Arguments:** 
- filter: object - filter parameters
  - user_id: string - (optional) owner id
  - app: string - (optional) application name
  - kind: string - (optional) dashboard kind
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: DataPage<DashboardV1> - retrieved page with Dashboard objects

### <a name="operation2"></a> Cmd: 'get\_dashboard'

Retrieves a single dashboard specified by user id, application name and dashboard kind

**Arguments:** 
- user_id: string - owner id
- app: string - application name
- kind: string - (optional) id to choose from multiple dashboards within the same app

**Returns:**
- err: Error - occured error or null for success
- result: DashboardV1 - retrieved Dashboard object

### <a name="operation3"></a> Cmd: 'set_dashboard'

Sets updated application dashboard

**Arguments:** 
- dashboard: DashboardV1 - Dashboard to be set.

**Returns:**
- err: Error - occured error or null for success
- result: DashboardV1 - set Dashboard object

### <a name="operation4"></a> Cmd: 'delete\_dashboards'

Deletes application dashboards specified by filter criteria

**Arguments:** 
- filter: object - filter parameters
  - user_id: string - (optional) owner id
  - app: string - (optional) application name
  - kind: string - (optional) dashboard kind

**Returns:**
- err: Error - occured error or null for success


