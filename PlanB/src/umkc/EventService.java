package umkc;

import javax.print.attribute.standard.Media;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.bson.types.ObjectId;

import com.ibm.json.java.JSONObject;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.WriteResult;
import com.mongodb.util.JSON;
import com.sun.swing.internal.plaf.metal.resources.metal_zh_TW;

import DAO.MongoDAO;

@Path("/event")
@Produces(MediaType.APPLICATION_JSON)
public class EventService {

	@GET
	@Path("/all")
	public Response getAll() {
		MongoDAO mongoDAO = new MongoDAO();
		DBCollection dbcollection = mongoDAO.getCollection("events");

		System.out.println(this.getClass().getName());

		BasicDBObject query = new BasicDBObject();

		DBCursor docs = dbcollection.find(query);
		// if (docs.hasNext()) {
		// BasicDBObject basicDBObject = (BasicDBObject) docs.next();
		// }

		JSON json = new JSON();
		String serialize = json.serialize(docs);

		return Response.ok(serialize)
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
				.header("Access-Control-Allow-Credentials", "true")
				.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
				.header("Access-Control-Max-Age", "1209600")
				.build();
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getEvent(@PathParam("id") String id) {
		System.out.println(id);
		DBCollection dbcollection = new MongoDAO().getCollection("events");
		
		BasicDBObject query = new BasicDBObject("_id", new ObjectId(id));
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
	
	@POST
	@Path("/delete")
	public Response delete(MultivaluedMap<String, String> jsonData) {
		System.out.println("data received from front end" + jsonData);
		String id = jsonData.get("id").get(0);
		System.out.println(id);

		DBCollection dbcollection = new MongoDAO().getCollection("events");
		
		BasicDBObject query = new BasicDBObject("_id", new ObjectId(id));
		WriteResult result = dbcollection.remove(query);
		
		JSONObject response = new JSONObject();
		response.put("nRemoved", result.getN());
		System.out.println(response);
		
		return Response.ok(response)
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
				.header("Access-Control-Allow-Credentials", "true")
				.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
				.header("Access-Control-Max-Age", "1209600")
				.build();
	}
}
