export let swaggerDocument = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "Feature Toggle Service",
    "description": "",
    "termsOfService": "http://swagger.io/terms/",
  },
  "host": "cpt.innovation.euromonitor.local",
  "basePath": "/featuretoggleservice/api",
  "schemes": [
    "http"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/features": {
      "get": {
        "tags": ["features"],
        "description": "List Features or Find Feature",
        "operationId": "featuresListFind",
        "produces": [
          "application/json",
        ],
        "parameters": [
          {
            "name": "projectKey",
            "in": "query",
            "description": "Project Key",
            "required": false,
            "type": "string"
          },
          {
            "name": "key",
            "in": "query",
            "description": "Feature Key",
            "required": false,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/feature"
              }
            }
          }
        }
      },
      "post": {
        "tags": ["features"],
        "description": "Create Feature",
        "operationId": "featureCreate",
        "produces": [
          "application/json",
        ],
        "parameters": [
          {
            "name": "name",
            "in": "formData",
            "description": "Feature Name",
            "required": true,
            "type": "string"
          },
          {
            "name": "key",
            "in": "formData",
            "description": "Feature Key",
            "required": true,
            "type": "string"
          },
          {
            "name": "type",
            "in": "formData",
            "description": "Feature Type",
            "required": true,
            "type": "string"
          },
          {
            "name": "projectKey",
            "in": "formData",
            "description": "Project Key",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "type": "object",
              "$ref": "#/definitions/feature"
            }
          },
        }
      }
    },
    "/features/toggle": {
      "put": {
        "tags": ["features"],
        "description": "Toggle Feature",
        "operationId": "featureToggle",
        "produces": [
          "application/json",
        ],
        "parameters": [
          {
            "name": "key",
            "in": "formData",
            "description": "Feature Key",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "type": "object",
              "$ref": "#/definitions/feature"
            }
          }
        }
      }
    },
    "/features/enabled": {
      "get": {
        "tags": ["features"],
        "description": "Feature Enabled",
        "operationId": "featureEnabled",
        "produces": [
          "application/json",
        ],
        "parameters": [
          {
            "name": "key",
            "in": "query",
            "description": "Feature Key",
            "required": true,
            "type": "string"
          },
          {
            "name": "consumerId",
            "in": "query",
            "description": "Consumer Id",
            "required": true,
            "type": "string"
          },
          {
            "name": "type",
            "in": "query",
            "description": "Consumer Type",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "type": "object",
              "$ref": "#/definitions/feature"
            }
          }
        }
      }
    },
    "/features/options": {
      "post": {
        "tags": ["features"],
        "description": "Add Options to Feature",
        "operationId": "featureAddOptions",
        "produces": [
          "application/json",
        ],
        "parameters": [
          {
            "name": "key",
            "in": "formData",
            "description": "Feature Key",
            "required": true,
            "type": "string"
          },
          {
            "name": "options",
            "in": "formData",
            "description": "List of Options",
            "required": true,
            "type": "array",
            "items": {
              "type": "object",
              "$ref": "#/definitions/option"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "type": "boolean",
            }
          }
        }
      },
      "delete": {
        "tags": ["features"],
        "description": "Remove Options to Feature",
        "operationId": "featureDeassignGroups",
        "produces": [
          "application/json",
        ],
        "parameters": [
          {
            "name": "key",
            "in": "formData",
            "description": "Feature Key",
            "required": true,
            "type": "string"
          },
          {
            "name": "optionKeys",
            "in": "formData",
            "description": "List of Option Keys",
            "required": true,
            "type": "array",
            "items": {
              "$ref": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "type": "boolean"
            }
          }
        }
      }
    },
    "/features/groups": {
      "post": {
        "tags": ["features"],
        "description": "Assign Groups to Feature",
        "operationId": "featureAssignGroups",
        "produces": [
          "application/json",
        ],
        "parameters": [
          {
            "name": "key",
            "in": "formData",
            "description": "Feature Key",
            "required": true,
            "type": "string"
          },
          {
            "name": "groupKeys",
            "in": "formData",
            "description": "List of Group Keys",
            "required": true,
            "type": "array",
            "items": {
              "$ref": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "type": "boolean",
            }
          }
        }
      },
      "delete": {
        "tags": ["features"],
        "description": "Deassign Groups to Feature",
        "operationId": "featureDeassignGroups",
        "produces": [
          "application/json",
        ],
        "parameters": [
          {
            "name": "key",
            "in": "formData",
            "description": "Feature Key",
            "required": true,
            "type": "string"
          },
          {
            "name": "groupKeys",
            "in": "formData",
            "description": "List of Group Keys",
            "required": true,
            "type": "array",
            "items": {
              "$ref": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "type": "boolean"
            }
          }
        }
      }
    },
    "/projects": {
      "get": {
        "tags": ["projects"],
        "description": "List Projects",
        "operationId": "projectList",
        "produces": [
          "application/json",
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/project"
              }
            }
          },
        }
      },
      "post": {
        "tags": ["projects"],
        "description": "Create Project",
        "operationId": "projectCreate",
        "produces": [
          "application/json",
        ],
        "parameters": [
          {
            "name": "name",
            "in": "formData",
            "description": "Project Name",
            "required": true,
            "type": "string"
          },
          {
            "name": "key",
            "in": "formData",
            "description": "Project Key",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "type": "object",
              "$ref": "#/definitions/project"
            }
          },
        }
      }
    },
    "/groups": {
      "get": {
        "tags": ["groups"],
        "description": "List Groups or Find Group",
        "operationId": "groupListFin",
        "produces": [
          "application/json",
        ],
        "parameters": [
          {
            "name": "key",
            "in": "query",
            "description": "Group Key",
            "required": false,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/group"
              }
            }
          },
        }
      },
      "post": {
        "tags": ["groups"],
        "description": "Create Group",
        "operationId": "groupCreate",
        "produces": [
          "application/json",
        ],
        "parameters": [
          {
            "name": "name",
            "in": "formData",
            "description": "Group Name",
            "required": true,
            "type": "string"
          },
          {
            "name": "key",
            "in": "formData",
            "description": "Group Key",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "type": "object",
              "$ref": "#/definitions/group"
            }
          },
        }
      }
    },
    "/groups/consumers": {
      "post": {
        "tags": ["groups"],
        "description": "Assign Consumers to Group",
        "operationId": "groupAssignConsumers",
        "produces": [
          "application/json",
        ],
        "parameters": [
          {
            "name": "key",
            "in": "formData",
            "description": "Group Key",
            "required": true,
            "type": "string"
          },
          {
            "name": "consumerIds",
            "in": "formData",
            "description": "List of Consumer Ids",
            "required": true,
            "type": "array",
            "items": {
              "$ref": "string"
            }
          },
          {
            "name": "type",
            "in": "formData",
            "description": "Consumers Type",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "type": "boolean",
            }
          }
        }
      },
      "delete": {
        "tags": ["groups"],
        "description": "Deassign Consumers to Group",
        "operationId": "groupDeassignConsumers",
        "produces": [
          "application/json",
        ],
        "parameters": [
          {
            "name": "key",
            "in": "formData",
            "description": "Group Key",
            "required": true,
            "type": "string"
          },
          {
            "name": "consumerIds",
            "in": "formData",
            "description": "List of Consumer Ids",
            "required": true,
            "type": "array",
            "items": {
              "$ref": "string"
            }
          },
          {
            "name": "type",
            "in": "formData",
            "description": "Consumers Type",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "type": "boolean"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "feature": {
      "type": "object",
      "required": [
        "key",
        "name",
        "type"
      ],
      "properties": {
        "key": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "enabled": {
          "type": "boolean"
        },
        "groups": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/featureGroup"
          }
        },
        "options": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/option"
          }
        },
        "associatedProject": {
          "type": "object",
          "$ref": "#/definitions/associatedProject"
        }
      }
    },
    "associatedProject": {
      "type": "object",
      "required": [
        "key",
        "name"
      ],
      "properties": {
        "key": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "featureGroup": {
      "type": "object",
      "required": [
        "key",
        "name"
      ],
      "properties": {
        "key": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "project": {
      "type": "object",
      "required": [
        "key",
        "name"
      ],
      "properties": {
        "key": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "group": {
      "type": "object",
      "required": [
        "key",
        "name"
      ],
      "properties": {
        "key": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "consumers": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/consumer"
          }
        },
      }
    },
    "consumer": {
      "type": "object",
      "required": [
        "id",
        "displayName"
      ],
      "properties": {
        "id": {
          "type": "string"
        },
        "displayName": {
          "type": "string"
        }
      }
    },
    "option": {
      "type": "object",
      "required": [
        "key",
        "name"
      ],
      "properties": {
        "key": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      }
    }
  }
}