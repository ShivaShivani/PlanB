package umkc;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.util.JSON;

import DAO.MongoDAO;

@Path("/settings")
public class SettingsService {
	
	@GET
	@Path("/{user_id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSettings(@PathParam("user_id") String id) {
		System.out.println(id);
		DBCollection dbcollection = new MongoDAO().getCollection("settings");
		
		BasicDBObject query = new BasicDBObject("user_id", new ObjectId(id));
		DBCursor docs = dbcollection.find(query);
		
		JSON json = new JSON();
		String response = json.serialize(docs);
		System.out.println(docs.toString());
		
		return Response.ok(response)
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
				.header("Access-Control-Allow-Credentials", "true")
				.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
				.header("Access-Control-Max-Age", "1209600")
				.build();
	}
	
	@PUT
	@Path("/{user_id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response createSettings(@PathParam("user_id") String id, MultivaluedMap<String, String> params) {
		System.out.println(id);
		System.out.println(params);
		
		BasicDBObject update = new BasicDBObject(params);

		DBCollection dbcollection = new MongoDAO().getCollection("settings");
		
		BasicDBObject query = new BasicDBObject("user_id", new ObjectId(id));
		DBObject result = dbcollection.findAndModify(query, update);
		
		JSON json = new JSON();
		String response = json.serialize(result);
		System.out.println(result.toString());
		
		return Response.ok(response)
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
				.header("Access-Control-Allow-Credentials", "true")
				.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
				.header("Access-Control-Max-Age", "1209600")
				.build();
	}

}
