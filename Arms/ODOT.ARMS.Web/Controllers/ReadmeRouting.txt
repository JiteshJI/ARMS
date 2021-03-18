TIPS while using POSTMAN to test the API's
1. The Query parameters should be used using the following notation:
 Ex: if we have a controller with a HTTP GET action and parameter as Contactid.

   [HttpGet("{Contactid}")]
        [Route("GetArmsContactAgencybyContactId")]
        [RequestHeaderMatchesMediaType("Accept", new[] { "application/vnd.dot.arms.contactagencyfordd+json" })]
        public async Task<IActionResult> GetArmsContactAgencybyContactId(string ContactId)

Testing this out in Postman would be in the following way:
http ://localhost:5000/api/ArmsContactAgencies/GetArmsContactAgencybyContactId?ContactId=EA
 
