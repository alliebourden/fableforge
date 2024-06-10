import * as UserController from '../../src/controllers/users'
import { Request, Response } from 'express';


const mockRequest = (body: any) => {
    return {
        body: body,
    } as unknown as Request;
};

const mockResponse = () => {
    let res = {
        status: jest.fn(),
        json: jest.fn()
    };
    res.status.mockReturnValue(res);
    res.json.mockReturnValue(res);
    return res as unknown as Response;
};

describe('createUser', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should create user and return 200', () => {
        let req = mockRequest({ name: 'John Doe', email: 'johndoe@testemail.com', username: 'johndoe1', password: '12345pass' });
        let res = mockResponse();
        
        const id = Math.floor(0.5 * 1000000)
        jest.spyOn(Math, 'random').mockReturnValue(0.5);

        UserController.createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            data: {
                email: "john@doe.ca",
                id: id,
                name: "John Doe"
            }
        })
    })

    it('should not create user and return 400 if no email is specified in the request', () => {
        let req = mockRequest({ name: 'John Doe' });
        let res = mockResponse();

        UserController.createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            status: "error",
            message: "User data is not formatted correctly"
        })
    })
})