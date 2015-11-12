package umkc;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/settings")
public class SettingsService {

	@Path("/test")
	@GET
	public Response test() {
		return Response.ok("This is settings").build();
	}
	
	
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
