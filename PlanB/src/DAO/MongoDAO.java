package DAO;

import javax.ws.rs.FormParam;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class MongoDAO {

	private DB db;

	public DB createConnection() {

		MongoClientURI uri = new MongoClientURI("mongodb://root:password@ds051863.mongolab.com:51863/group12");
		MongoClient client = new MongoClient(uri);

		db = client.getDB(uri.getDatabase());
		return db;
	}

	public DBCollection getCollection(String name) {
		this.createConnection();
		DBCollection collection = db.getCollection(name);
		return collection;
	}
}
