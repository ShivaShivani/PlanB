package DAO;

import javax.ws.rs.FormParam;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class MongoDAO {
	
	public DBCollection createConnection(){
		
		MongoClientURI uri = new MongoClientURI("mongodb://root:password@ds051863.mongolab.com:51863/group12");
		MongoClient client = new MongoClient(uri);

		DB db = client.getDB(uri.getDatabase());
		DBCollection users = db.getCollection("users");
		
		return users;
	}

}
