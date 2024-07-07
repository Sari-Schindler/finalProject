const { runUserStrategyService } = require("../services/runUserStrategyService.js");

module.exports.runUserStrategyController = {
    async runUserStrategy(req, res) {
        try {
            const { userInput } = req.body;

            if (!userInput) {
                return res.status(400).json({ message: "User input is required" });
            }

            await runUserStrategyService.getChatGptResponse(userInput);

            let userStrategyString = await runUserStrategyService.readGptResponse();
            eval(userStrategyString); 

            res.status(200).json({ message: "Strategy executed successfully" });
        } catch (error) {
            console.error('Error running user strategy:', error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};


// const { runUserStrategyService } = require("../services/runUserStrategyService.js");

// module.exports.runUserStrategyController = {
//   async runUserStrategy(req, res) {
//     try {
//       const { userInput } = req.body;

//       if (!userInput) {
//         return res.status(400).json({ success: false, message: "User input is required" });
//       }

//       await runUserStrategyService.getChatGptResponse(userInput);

//       let userStrategyString = await runUserStrategyService.readGptResponse();

//       // Assuming userStrategyString contains the JavaScript code
//       res.status(200).json({ success: true, script: userStrategyString, gptResponse: userStrategyString }); // Sending gptResponse back to client
//     } catch (error) {
//       console.error('Error running user strategy:', error);
//       res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
//   }
// };
