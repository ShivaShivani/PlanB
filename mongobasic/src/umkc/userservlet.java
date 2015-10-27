package umkc;

import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.json.java.JSON;
import com.ibm.json.java.JSONObject;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.WriteResult;

import DAO.MongoDAO;

/**
 * Servlet implementation class userservlet
 */
@WebServlet("/user")
public class userservlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public userservlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		
		MongoDAO mongoDAO = new MongoDAO();
		DBCollection dbcollection = mongoDAO.createConnection();
		
		System.out.println("hello");
		
		BasicDBObject query = new BasicDBObject();
		query.put("name", request.getParameter("username"));
		query.put("password", request.getParameter("password"));
		System.out.println(request.getParameter("username"));
		System.out.println(request.getParameter("password"));
		DBCursor docs = dbcollection.find(query);
		JSONObject jsonObject= new JSONObject();
		if(docs.hasNext()) {
			BasicDBObject basicDBObject = (BasicDBObject) docs.next();
			System.out.println("Entered inside block");
			System.out.println(basicDBObject.get("name"));
			System.out.println(basicDBObject.get("password"));
			
			jsonObject.put("status", "success");
		}else{
			jsonObject.put("status", "failed");
		}
		
		response.getWriter().write(jsonObject.toString());
		//response.getWriter().write(docs.toArray().toString());

	response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Max-Age", "86400");
		
		
	}
	

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		StringBuilder buffer = new StringBuilder();
		BufferedReader reader = request.getReader();
		String line;
		while ((line = reader.readLine()) != null) {
			buffer.append(line);
		}
		String data = buffer.toString();
		System.out.println(data);

		JSONObject params = (JSONObject) JSON.parse(data);
		BasicDBObject user1 = new BasicDBObject(params);
		
		for(Object key : params.keySet().toArray()) {
			user1.put(key.toString(), params.get(key));
		}
		
		System.out.println(user1.toJson());
		
		
		MongoClientURI uri = new MongoClientURI("mongodb://root:password@ds051863.mongolab.com:51863/group12");
		MongoClient client = new MongoClient(uri);

		DB db = client.getDB(uri.getDatabase());
		DBCollection users = db.getCollection("users");
		//JSONObject json = new JSONObject();
		if(users.find(user1).hasNext()){
			System.out.println("enter");
			params.put("status","failed");
			System.out.println("assam");

		}
		
		else{
			params.put("status","success");
			System.out.println("entering");
		WriteResult result = users.insert(user1);
		response.getWriter().write(result.toString());
		}
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Max-Age", "86400");

		
	
	}
	
	
	@Override
	protected void doOptions(HttpServletRequest arg0, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doOptions(arg0, response);

		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, HEAD, OPTIONS");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Max-Age", "86400");
	}

}
