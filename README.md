# Technical Test: Elasticsearch Setup and Testing with Docker

## Summary

### Description

Node.js API that performs both exact and fuzzy searches in Elasticsearch.

### Requirements

- Node.js v20.10.0
- Docker
- Docker Compose

## Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jmaciass1/Elastic_api.git
   cd Elastic_api
   ```

2. **Start Elasticsearch with Docker Compose:**
   ```bash
   docker compose up -d
   ```

3. **Configure Elasticsearch:**
   ```bash
   docker exec -it elasticsearch bin/elasticsearch-reset-password -u elastic
   ```
   - Create a `.env` file and copy the content from `.env.example`.
   - Copy the generated password into the `.env` file.
   - Verify the connection:
     ```bash
     curl -u elastic:your_password -X GET "https://localhost:9200/_cluster/health" --insecure
     ```

4. **Set up the Node.js project:**
   ```bash
   npm install
   ```

5. **Initialize the API:**
   ```bash
   node --env-file .env app.js
   ```

## API Usage

### Base URL

`http://localhost:3000`

### Endpoints

#### 1. Health Check

- **Endpoint:** `/`
- **Method:** `GET`
- **Description:** Returns a message indicating that the Elasticsearch API is running.
- **Example Request:**
  ```bash
  curl http://localhost:3000/
  ```
- **Expected Response:**
  ```json
  {
    "message": "Elasticsearch API está corriendo."
  }
  ```

#### 2. Index a User

- **Endpoint:** `/api/index/user`
- **Method:** `POST`
- **Description:** Indexes a new user in Elasticsearch.
- **Request Body:**
  ```json
  {
    "id": "1",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "age": 30
  }
  ```
- **Example Request:**
  ```bash
  curl -X POST http://localhost:3000/api/index/user \
  -H "Content-Type: application/json" \
  -d '{
    "id": "1",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "age": 30
  }'
  ```
- **Expected Response:**
  ```json
  {
    "message": "Usuario indexado con éxito"
  }
  ```

#### 3. Search All Users

- **Endpoint:** `/api/search/all`
- **Method:** `GET`
- **Description:** Retrieves all indexed users.
- **Example Request:**
  ```bash
  curl http://localhost:3000/api/search/all
  ```
- **Expected Response:**
  ```json
  [
    {
      "_id": "1",
      "_source": {
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "age": 30
      }
    }
  ]
  ```

#### 4. Exact Search

- **Endpoint:** `/api/search/exact`
- **Method:** `POST`
- **Description:** Performs an exact search for users by the specified field.
- **Request Body:**
  ```json
  {
    "field": "name",
    "query": "Alice Johnson"
  }
  ```
- **Example Request:**
  ```bash
  curl -X POST http://localhost:3000/api/search/exact \
  -H "Content-Type: application/json" \
  -d '{
    "field": "name",
    "query": "Alice Johnson"
  }'
  ```
- **Expected Response:**
  ```json
  [
    {
      "_id": "1",
      "_source": {
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "age": 30
      }
    }
  ]
  ```

#### 5. Fuzzy Search

- **Endpoint:** `/api/search/fuzzy`
- **Method:** `POST`
- **Description:** Performs a fuzzy search for users.
- **Request Body:**
  ```json
  {
    "field": "name",
    "query": "Alice",
    "fuzziness": 2,
    "prefixLength": 1
  }
  ```
- **Example Request:**
  ```bash
  curl -X POST http://localhost:3000/api/search/fuzzy \
  -H "Content-Type: application/json" \
  -d '{
    "field": "name",
    "query": "Alice",
    "fuzziness": 2,
    "prefixLength": 1
  }'
  ```
- **Expected Response:**
  ```json
  [
    {
      "_id": "1",
      "_source": {
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "age": 30
      }
    }
  ]
  ```

## Testing

### Running Tests with Axios

To perform tests of the API using axios:

1. Ensure the API server is running.
2. Run the test script:
   ```bash
   node tests/axiosTest.js
   ```

#### Expected Results:

The test script will:
- Index several users in Elasticsearch.
- Retrieve all indexed users.
- Perform an exact search and a fuzzy search.

Results will be displayed in the console, showing whether each operation was successful or not.