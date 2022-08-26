// const backend_url= "https://entangle-api.herokuapp.com/";
var backend_url= "http://10.15.168.234:8000/api/";
var backend_url= "http://192.168.2.22:8000/api/";
// var backend_url= "http://192.168.2.17:8000/api/";
//var backend_url = "http://192.168.0.51:8000/api/"
//var backend_url= "http://192.168.6.235:8000/api/";
//var backend_url= "http://192.168.0.108:8000/api/";
//var backend_url = "http://exodia-dev.eba-486tzhkk.eu-west-2.elasticbeanstalk.com/api/"


var backend_url_neo4j = "http://192.168.2.22:8000/graph/";


//token
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxNDEzNDU4LCJpYXQiOjE2NTE0MDk4NTgsImp0aSI6ImM2YWU4NTJmODU5MzQ0ZTU5NjE3ZWYyNzE0YmJmN2QzIiwidXNlcl9pZCI6N30.Oq1N45uSpn3MzYADepm-_5oCQGib5qwsn9XwWDfIhGc"

const publishableKey = ""

const lelouch_photo = "https://slifer.s3.amazonaws.com/Lelouch-Zero.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5MWUER255TQW3LTS%2F20220718%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20220718T112528Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=63c4c79d74efd3589b1bf44c6d0f1b6838ae3f1a8219743436a3fe1bd6703b28"



module.exports = {backend_url,backend_url_neo4j, token, lelouch_photo};
      