"use strict"

global.ArcJSON = {};

/*************************************************

More info at:
http://resources.arcgis.com/en/help/sds/rest/featureServiceObject.html

*************************************************/
ArcJSON.featureService = function(options){
	var defaultFeature = {
		"maxRecordCount": 2000,
		"supportedQueryFormats": "JSON",
		"capabilities": "Query,Editing,Create,Update,Delete",
		"description": "",
		"allowGeometryUpdates": "true",
		"units": "esriMeters",
		"syncEnabled": "false",
		"editorTrackingInfo": {
			"enableEditorTracking": "false",
			"enableOwnershipAccessControl": "false",
			"allowOthersToUpdate": "true",
			"allowOthersToDelete": "true"
		},
		"xssPreventionInfo": {
			"xssPreventionEnabled": "true",
			"xssPreventionRule": "InputOnly",
			"xssInputRule": "rejectInvalid"
		},
		"tables": [],
		"name": "Set service name"
	};
	return overwrite(defaultFeature, options);
};


/*************************************************

More info at:
http://resources.arcgis.com/en/help/sds/rest/featureLayer.html

*************************************************/
ArcJSON.featureLayer = function(options){
	var attributes, key,
        defaultLayer = {
		"adminLayerInfo": {
			"geometryField": {
				"name": "Shape",
				"srid": 4326
			}
		},
		"name": "Set_a_Layer_Name",
		"type": "Feature Layer",
		"geometryType": "esriGeometryPoint",
		"extent": {
			"type": "extent",
			"xmin": -17.70518418985952,
			"ymin": 29.007108442849102,
			"xmax": 3.871964247634747,
			"ymax": 42.65733404196801,
			"spatialReference": {
				"wkid": 4326
			}
		},
		"drawingInfo": {
			"renderer": {
				"type": "simple",
				"symbol": {
					"type": "esriPMS",
					"url": "blue_small_dot.png",
					"contentType": "image/png",
					"width": 9.75,
					"height": 9.75,
					"xoffset": 0,
					"yoffset": 0,
					"angle": 0,
					"imageData": "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAA9UlEQVQYV42QQU7DMBBFx3aCnRSJBomuuvAGwZLehNyA3qBX6Ak4Qk9QpTcp+2686AoqGiSa2MQeozhNJSoWnYWtsb7/n3kEjiWL/VCgewbwsnsiSlO2UnlWhq497ov3pxhYcZtyOeBRkB2Mhc/KqAZcvslHb6R1SgHX4+FA8oj1AeE21sG2PKgK6IQ8LncvN8nVIkv5H1Hf7CsDX/XPlDwsP17vrpPZuVsvbF133/U8CLOEz+KI/uvYWISyNvMQLWK2EGfz9b+0daAbNw3LCO/WImKSkgDhVOg9aOuUJmxywsOQFpQSSTtigOAB0StHscNzKfBfZkltaaUCjW0AAAAASUVORK5CYII="
				},
				"label": "",
				"description": ""
			},
			"transparency": 0,
			"labelingInfo": null
		},
		"objectIdField": "OBJECTID",
		"fields": [
		{
			"name": "OBJECTID",
			"type": "esriFieldTypeOID",
			"alias": "OBJECTID",
			"sqlType": "sqlTypeOther",
			"nullable": false,
			"editable": false,
			"domain": null,
			"defaultValue": null
		}],
        "templates": [
            {
                "name": "New Feature",
                "description": "",
                "drawingTool": "esriFeatureEditToolPoint",
                "prototype": {
                    "attributes": {}
                }
            }
        ],
		"supportedQueryFormats": "JSON",
		"hasStaticData": false,
		"maxRecordCount": 10000,
		"capabilities": "Query,Editing,Create,Update,Delete"
	};

	defaultLayer = overwrite(defaultLayer, options);

	if(options && options.fields){
        defaultLayer.templates = defaultLayer.templates || {};
        defaultLayer.fields = options.fields;

        attributes = {};
        for (key in options.fields) {
            if (options.fields.hasOwnProperty(key)) {
                attributes[options.fields[key].name] = null;
            }
        }
        defaultLayer.templates.prototype = attributes
    }

	return defaultLayer;
};

/************************************************************
 *
 *   This function returns the SQLType for a given EsriType
 *
 ************************************************************/
ArcJSON.esriTypeToSqlType = function(esriType){
    // Perhaps some matches are missing: http://arcg.is/1H1wsUk
    switch (esriType){
        case "esriFieldTypeString": return "sqlTypeNVarchar";
        case "esriFieldTypeDouble": return "sqlTypeDecimal";
        case "esriFieldTypeInteger": return "sqlTypeInteger";
        default: return "sqlTypeOther";
    }
};

/*************************************************

FIELD OBJECT

*************************************************/
ArcJSON.field = function(options){
	var o = options,
        f = {
		"name": "name",
		"type": "codedValue",
		"alias": "name",
		"sqlType": "sqlTypeNVarchar",
		"nullable": true,
		"editable": true,
		"domain": null,
		"defaultValue": null
	};

    if(f.type === "esriFieldTypeString"){
        f.length = 255
    }
    if(o){
	    if(o.name){ f.name = o.name; f.alias = o.name;}
	    if(o.type){ f.type = o.type; f.sqlType = ArcJSON.esriTypeToSqlType(o.type)}
    }

    return overwrite(f, o);
};

/*************************************************

More info at:
http://resources.arcgis.com/en/help/rest/apiref/index.html?exportwebmap_spec.html

*************************************************/
ArcJSON.exportableWebmap = function(options){
	var webmap = {
		"mapOptions": {
			"showAttribution": false,
			"extent": {
				"xmin": -10212866.663781697,
				"ymin": 3600493.212559925,
				"xmax": -9987836.052510148,
				"ymax": 3829804.2974154423,
				"spatialReference": {
					"wkid": 102100,
					"latestWkid": 3857
				}
			},
			"spatialReference": {
				"wkid": 102100,
				"latestWkid": 3857
			}
		},
		"operationalLayers": [
		{
			"id": "Ocean",
			"title": "Ocean",
			"opacity": 1,
			"url": "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer"
		}
		],
		"exportOptions": {
			"outputSize": [
			300,
			300
			],
			"dpi": 96
		}
	};

	return overwrite(webmap, options);
};

// Utility to overwrite default values in a JSON object
var overwrite = function(a, b){
    if(b){
	    if(typeof(b) === "object"){
	        for (var key in b) {
	            if(typeof(b[key]) === "object"){
	                if(Object.prototype.toString.call(b[key]) === '[object Array]'){
	                    a[key] = [];
	                    for(var i=0;i<b[key].length;i++){
	                        a[key][i] = overwrite(a[key][i], b[key][i]);
	                    }
	                }else{
	                    a[key] = overwrite(a[key], b[key]);
	                }
	            }else{
	                a = a || {};
	                a[key] = b[key];
	            }
	        }
	    }else{
	        a = b;
	    }
    }

	return a;
};

module.exports = ArcJSON;