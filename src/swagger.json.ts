export let swaggerDocument = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "Feature Toggle Service",
    "description": "",
    "termsOfService": "http://swagger.io/terms/",
    "contact": {
      "name": ""
    },
    "license": {
      "name": "MIT"
    }
  },
  "host": "localhost:3000",
  "basePath": "/api",
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
    "/feature/list": {
      "get": {
        "tags": ["feature"],
        "description": "",
        "operationId": "featureList",
        "produces": [
          "application/json",
        ],
        "parameters": [
          {
            "name": "projectKey",
            "in": "query",
            "description": "Project Key",
            "required": true,
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
      }
    },
    "/feature/create": {
      "post": {
        "tags": ["feature"],
        "description": "",
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
    "/feature/find": {
      "get": {
        "tags": ["feature"],
        "description": "",
        "operationId": "featureFind",
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
    "/feature/toggle": {
      "put": {
        "tags": ["feature"],
        "description": "",
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
    "/project/list": {
      "get": {
        "tags": ["project"],
        "description": "",
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
      }
    },
    "/project/create": {
      "post": {
        "tags": ["project"],
        "description": "",
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
    "/group/list": {
      "get": {
        "tags": ["group"],
        "description": "",
        "operationId": "groupList",
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
                "$ref": "#/definitions/group"
              }
            }
          },
        }
      }
    },
    "/group/create": {
      "post": {
        "tags": ["group"],
        "description": "",
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
        "groups": {
          "type": "array",
          "items": {
              "$ref": "#/definitions/featureGroup"
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
    }
  }
}