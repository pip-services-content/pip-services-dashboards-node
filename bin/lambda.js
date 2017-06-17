let DashboardsLambdaFunction = require('../obj/src/container/DashboardsLambdaFunction').DashboardsLambdaFunction;

module.exports = new DashboardsLambdaFunction().getHandler();