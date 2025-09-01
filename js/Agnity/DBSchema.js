function AgnityDBSchema(inDBName, inTableData)
{
	this.tableData = inTableData;
	this.dbName = inDBName;
	
	this.oracleDBSchema = function()
	{
		var tableName = Agnity.getLabel(this.tableData.ui, this.tableData.cell);
		
		return this.createDBTableWithColumns(tableName);
	}
	
	this.createDBTableWithColumns = function(tableName)
	{
		var self = this;
		
		var idx = 1, len = this.tableData.manageColumnsMap.size;
		if(tableName == null || !tableName) return;
		
		var createTable = 'CREATE TABLE ' + this.dbName + '.' + tableName + '(';
		
		this.tableData.manageColumnsMap.forEach(function(value, key) {
			
			createTable += self.constructTableColumn(key, value);
			
			if(idx != len)
				createTable += ', \n';
			else
				createTable += ' )';
			
			idx++;
		});
		
		console.log(createTable);
		return createTable;
	}
	
	this.constructTableColumn = function(key, value)
	{
		var ret = key + ' ' + value.type;
		
		if(value.length != '')
			ret += '(' + value.length + ')';
		
		if(!value.isNullAllowed)
			ret += ' NOT NULL';
		
		if(value.defaultVal != 'NULL')
			ret += ' DEFAULT (' + value.defaultVal + ')';
		
		return ret;
	}
	
	this.createIndex = function()
	{
		var tableName = Agnity.getLabel(this.tableData.ui, this.tableData.cell);
		
		if(tableName == null || !tableName || tableName == '') return;
		
		return this.createIndexOnTable(tableName);
	}
	
	this.createIndexOnTable = function(tableName)
	{
		var self = this;
		
		var createIndex = '';
		
		this.tableData.manageIndexesMap.forEach(function(value, key) {
			
			createIndex += 'create ' + value.indexType + ' Index ';
			createIndex += key + ' on ' + tableName + ' (' + value.columns + ') \n';
			
		});
		
		console.log(createIndex);
		return createIndex;
	}
	
}