// class BiootServerController {
//     constructor() {}
//
//     // Middleware to set CORS headers
//     setCorsHeaders(req, res, next) {
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//         res.setHeader('Access-Control-Allow-Headers', 'x-ijt, Content-Type, Authorization');
//         res.setHeader('Access-Control-Allow-Credentials', true);
//         next(); // Proceed to the next middleware or route handler
//     }
//
//     // // Unified request handler
//     // async handleRequest(req, res) {
//     //     switch (req.method) {
//     //         case 'GET':
//     //             await this.getBiootServerData(req, res);
//     //             break;
//     //         case 'POST':
//     //             await this.postBiootServerController(req, res);
//     //             break;
//     //         default:
//     //             res.status(405).send('Method Not Allowed'); // Handle unsupported methods
//     //             break;
//     //     }
//     // }
//
//     async getBiootServerData(req, res) {
//
//     }
//
//     async postBiootServerController(req, res) {
//
//     }
// }
//
// module.exports = BiootServerController;