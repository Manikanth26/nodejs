const request = require("supertest")
const { app, verifyToken }= require("./jwt.js");
const data = require("./test-data/jwt.test.data.js")
const httpMocks = require("node-mocks-http");
const Users = require("./model/userdata.model.js");
const FlightBooking = require("./model/bookingdata.model.js")
const jwt = require("jsonwebtoken")

jest.mock("./model/userdata.model.js")
jest.mock("./model/bookingdata.model.js")
jest.mock("jsonwebtoken")

describe("POST /signup" , ()=>{
    it("should create a new user", async ()=>{
        let userData = {
            firstName : "Manikanth",
            lastName : "Bheemanathuni",
            email : "manikanth2233@gmail.com",
            password : "Mani@6699",
            phoneNumber : 9553344092
        }
        let req = httpMocks.createRequest({
            method : "POST",
            path : "/signup",
            body : userData
        })
        let res = httpMocks.createResponse();
        await app(req,res);
        expect(res.statusCode).toBe(200);
    });

    it("should throw error when user already registered", async ()=>{
        const userData = {
            firstName : "Manikanth",
            lastName : "Bheemanathuni",
            email : "manikanth.190503@gmail.com",
            password : "Mani@6699",
            phoneNumber : 9553344092
        }
        jest.spyOn(Users , "findOne").mockResolvedValue(userData.email);
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/signup",
            body: userData
        });
        const res = httpMocks.createResponse();
        await app(req,res);
        expect(res.statusCode).toBe(403);
    })
})

describe("/POST /login",()=>{
    it("should return user not found", async ()=>{
        const loginData = {
            email : "manikant",
            password : "Mani@66t"
        }
        jest.spyOn(Users,"findOne").mockResolvedValue(null)
        const req = httpMocks.createRequest({
            method : "POST",
            path : "/login",
            body : loginData
        })
        const res = httpMocks.createResponse();
        await app(req,res);
        expect(res.statusCode).toBe(404);
    })
    it("should login with valid credentials", async ()=>{
        const loginData = {
            email : "manikanth.190503@gmail.com",
            password : "Mani@2323"
        }
        jest.spyOn(Users,"findOne").mockResolvedValue(loginData)
        jest.spyOn(jwt, 'sign').mockReturnValue("mockedToken");
        const req = httpMocks.createRequest({
            method : "POST",
            path : "/login",
            body : loginData
        })
        const res = httpMocks.createResponse();
        await app(req,res);
        expect(res.statusCode).toBe(200);
    })
    
})
describe("POST /book-ticket",()=>{
    it("should book a ticket",async ()=>{
        const token = "mockedToken";
        const req = httpMocks.createRequest({
            method : "POST",
            path : "/book-ticket",
            headers : {
                authorization : `Bearer ${token}`
            },
            body : data.bookingData
        })
        const res = httpMocks.createResponse();
        const next = jest.fn();
        jwt.verify.mockImplementation((token,secret,callback)=>{
            callback(null,{email: "example@gmail.com"});
        })
        await app(req,res);
        expect(res.statusCode).toBe(200);
    })
})
describe("GET /fetch-ticket/:id",()=>{
    it("should fetch a ticket if id is valid", async ()=>{
        const token = "mockedToken";
        const mockTicketId = 12345;
        const req = httpMocks.createRequest({
            method : "GET",
            path : `/fetch-ticket/${mockTicketId}`,
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        const res = httpMocks.createResponse();
        const next = jest.fn();
        jwt.verify.mockImplementation((token,secret,callback)=>{
            callback(null,{email: "example@gmail.com"});
        })
        jest.spyOn(FlightBooking, "findOne").mockResolvedValue({id : mockTicketId});
        await app(req,res);
        expect(res.statusCode).toBe(200);
    })
    it("should return error if id is not valid",async ()=>{
        const token = "mockedToken";
        const mockTicketId = null;
        const req = httpMocks.createRequest({
            method : "GET",
            path : `/fetch-ticket/${mockTicketId}`,
            headers : {
                authorization : `Bearer ${token}`
            },
            params : {
                id : mockTicketId
            }
        })
        const res = httpMocks.createResponse();
        const next = jest.fn();
        jwt.verify.mockImplementation((token,secret,callback)=>{
            callback(null,{email: "example@gmail.com"});
        })
        jest.spyOn(FlightBooking, "findOne").mockResolvedValueOnce(null);
        await app(req,res);
        expect(res.statusCode).toBe(404);
    })
})
describe("PUT /update-ticket/:id",()=>{
    it("should return 200 if update is successfull",async ()=>{
        const token = "mockedToken";
        const mockTicketId = 12345;
        const mockedTicketData = {
            id:mockTicketId,
            fromLocation: "Chennai",
            toLocation: "Delhi",
            date: "2024-02-14",
            time: "11:00"
        }
        const req = httpMocks.createRequest({
            method : "PUT",
            path : `/update-ticket/${mockTicketId}`,
            headers : {
                authorization : `Bearer ${token}`
            },
            params : {
                id : mockTicketId
            },
            body:mockedTicketData
        })
        const res = httpMocks.createResponse();
        jest.spyOn(FlightBooking, "findOne").mockResolvedValue(mockTicketId);
        // jest.spyOn(FlightBooking, "updateOne").mockResolvedValue(mockTicketId,mockedTicketData);
        await app(req,res);
        expect(res.statusCode).toBe(200);
    })
    it("should return 404 if update is not successfull",async ()=>{
        const token = "mockedToken";
        const mockTicketId = null;
        const req = httpMocks.createRequest({
            method : "PUT",
            path : `/update-ticket/${mockTicketId}`,
            headers : {
                authorization : `Bearer ${token}`
            },
            params : {
                id : mockTicketId
            }
        })
        const res = httpMocks.createResponse();
        jest.spyOn(FlightBooking, "findOne").mockResolvedValueOnce(null);
        await app(req,res);
        expect(res.statusCode).toBe(404);
    })
})
describe("DELETE /delete-ticket/:id",()=>{
    it("should delete a ticket if id is valid", async ()=>{
        const token = "mockedToken";
        const mockTicketId = 12345;
        const req = httpMocks.createRequest({
            method : "DELETE",
            path : `/delete-ticket/${mockTicketId}`,
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        const res = httpMocks.createResponse();
        const next = jest.fn();
        jwt.verify.mockImplementation((token,secret,callback)=>{
            callback(null,{email: "userz@gmail.com"});
        })
        jest.spyOn(FlightBooking, "findOne").mockResolvedValue({id : mockTicketId});
        await app(req,res);
        expect(res.statusCode).toBe(200);
    })
    it("should return error if id is not valid",async ()=>{
        const token = "mockedToken";
        const mockTicketId = null;
        const req = httpMocks.createRequest({
            method : "DELETE",
            path : `/delete-ticket/${mockTicketId}`,
            headers : {
                authorization : `Bearer ${token}`
            },
            params : {
                id : mockTicketId
            }
        })
        const res = httpMocks.createResponse();
        const next = jest.fn();
        jwt.verify.mockImplementation((token,secret,callback)=>{
            callback(null,{email: "userz@gmail.com"});
        })
        jest.spyOn(FlightBooking, "findOne").mockResolvedValueOnce(null);
        await app(req,res);
        expect(res.statusCode).toBe(404);
    })
})


describe("verifyToken",()=>{
    it("should return 400 if Authorization header not found",async ()=>{
        const req = httpMocks.createRequest({
            headers : {}
        })
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await verifyToken(req,res,next)
        expect(res.statusCode).toBe(400);
    })
    it("should return 404 if Authorization token not found",async ()=>{
        const req = httpMocks.createRequest({
            headers : {
                authorization : " "
            }
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();
        jwt.verify.mockImplementation((token,secret,callback)=>{
            callback(new Error("Token not found"));
        })
        await verifyToken(req,res,next)
        expect(res.statusCode).toBe(404);
    })
    it("should return error if token verification failed",async ()=>{
        const req = httpMocks.createRequest({
            headers : {
                authorization : "Bearer Invalid-token"
            }
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();
        jwt.verify.mockImplementation((token,secret,callback)=>{
            callback(new Error("Invalid token"));
        })
        await verifyToken(req,res,next)
        expect(res.statusCode).toBe(404);
    })
})