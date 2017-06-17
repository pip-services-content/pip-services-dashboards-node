# HTTP REST Protocol (version 1) <br/> Dashboards Microservice

Dashboards microservice implements a HTTP compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [TileV1 class](#class1)
* [TileGroupV1 class](#class2)
* [DashboardV1 class](#class3)
* [POST /dashboards/get_dashboards](#operation1)
* [POST /dashboards/get_dashboard](#operation2)
* [POST /dashboards/set_dashboard](#operation3)
* [POST /dashboards/delete_dashboards](#operation4)

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

### <a name="operation1"></a> Method: 'POST', route '/dashboards/get_dashboards'

Retrieves a list of dashboards by specified criteria

**Request body:** 
- filter: object - filter parameters
  - user_id: string - (optional) owner id
  - app: string - (optional) application name
  - kind: string - (optional) dashboard kind
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
DataPage<DashboardV1> or error

### <a name="operation2"></a> Method: 'POST', route '/dashboards/get\_dashboard'

Retrieves a single dashboard specified by user id, application name and dashboard kind

**Request body:** 
- user_id: string - owner id
- app: string - application name
- kind: string - (optional) id to choose from multiple dashboards within the same app

**Response body:**
DashboardV1 object, null if object wasn't found or error 

### <a name="operation3"></a> Method: 'POST', route '/dashboards/set_dashboard'

Sets updated application dashboard

**Request body:**
- dashboard: DashboardV1 - Dashboard to be set.

**Response body:**
Set DashboardV1 object or error
 
### <a name="operation4"></a> Method: 'POST', route '/dashboards/delete\_dashboards'

Deletes application dashboards specified by filter criteria

**Request body:** 
- filter: object - filter parameters
  - user_id: string - (optional) owner id
  - app: string - (optional) application name
  - kind: string - (optional) dashboard kind

**Response body:**
Error or null if operation was executed successfully 
 
