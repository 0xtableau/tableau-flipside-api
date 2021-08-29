(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "symbol",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "hour",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "price",
            dataType: tableau.dataTypeEnum.float
        }];
    
        var tableSchema = {
            id: "tokenFeed",
            alias: "defi tokens",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        var apiCall = "https://api.flipsidecrypto.com/api/v2/queries/77a363ca-4096-4414-82e3-9c5c7f7e6b56/data/latest";

        $.getJSON(apiCall, function(resp) {
            var response = JSON.parse(JSON.stringify(resp)),
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = response.length; i < len; i++) {
                tableData.push({
                    "symbol": response[i].symbol,
                    "hour": response[i].hour,
                    "price": response[i].price
                    
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Token Price Feed";
            tableau.submit();
        });
    });

})();