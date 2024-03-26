const request = require("supertest")
const app = require("./jwt.js");
const data = require("./test-data/jwt.test.data.js")
const httpMocks = require("node-mocks-http");
const Users = require("./model/userdata.model.js");
const FlightBooking = require("./model/bookingdata.model.js")
const jwt = require("jsonwebtoken")

jest.mock("./model/userdata.model.js")
jest.mock("./model/bookingdata.model.js")
jest.mock("jsonwebtoken")

describe("POST /signup" , ()=>{
    test("should create a new user", async ()=>{
        const req = httpMocks.createRequest({
            method : "POST",
            path : "/signup",
            body : data.signupData
        })
        const res = httpMocks.createResponse();
        await app(req,res);
        expect(res.statusCode).toBe(200);
    });

    it("should throw error when user already registered", async ()=>{
        Users.findOne.mockResolvedValueOnce(data.signupData.email);
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/signup",
            body:data.signupData
        });
        const res = httpMocks.createResponse();
        await app(req,res);
        expect(res.statusCode).toBe(403);
    })
})

describe("/POST /login",()=>{
    test("should return user not found", async ()=>{
        const req = httpMocks.createRequest({
            method : "POST",
            path : "/login",
            body : data.loginData
        })
        const res = httpMocks.createResponse();
        await app(req,res);
        expect(res.statusCode).toBe(404);
    })
    test("should login with valid credentials", async ()=>{
        //const token = "mockedtoken"
        Users.findOne.mockResolvedValueOnce(data.loginData);
        const req = httpMocks.createRequest({
            method : "POST",
            path : "/login",
            body : data.loginData
        })
        const res = httpMocks.createResponse();
        await app(req,res);
        expect(res.statusCode).toBe(200);
    })
    
})
// describe("POST /book-ticket",()=>{
//     it("should book a ticket",async ()=>{
//         const req = httpMocks.createRequest({
//             method : "POST",
//             path : "/book-ticket",
//             data : data.bookingData
//         })
//         const res = httpMocks.createResponse();
//         //const token = "mockedtoken"
//         await app(req,res);
//         expect(res.statusCode).toBe(200);
//     })
// })
describe("GET /fetch-ticket/:id",()=>{
    it("should fetch a ticket with valid token and ticket", async ()=>{
        // const mockedToken = "validmockedtoken";
        // const mockUser = {email : "mock@gmail.com"}
        // const mockTicketId = "mockedTicketid";

        // jwt.verify.mockImplementationOnce((token, secret, callback)=>{
        //     callback(null, mockUser);
        // })

        // FlightBooking.findOne.mockResolvedValueOnce(mockTicketId)

        jest.spyOn(jwt,"verifyToken").mockResolvedValue("mockedtoken")
        const req = httpMocks.createRequest({
            method : "GET",
            path : "/fetch-ticket",
            headers : {
                authorization : `Bearer ${mockedToken}`
            },
            params : {
                id : mockTicketId
            }
        })
        const res = httpMocks.createResponse();
        await app(req,res);
        expect(res.statusCode).toBe(200);
    })
})
// describe("POST /book-ticket",()=>{
//     it("should book a ticket",async ()=>{
//         const req = httpMocks.createRequest({
//             method : "POST",
//             path : "/book-ticket",
//             data : data.bookingData
//         })
//         const res = httpMocks.createResponse();
//         //const token = "mockedtoken"
//         await app(req,res);
//         expect(res.statusCode).toBe(200);
//     })
// })