const loginCheck = require("../middlewares/auth.middleware");

const homeRouter = require("express").Router()
// path
homeRouter.get("/", (req, res) => {
  // json
  res.json({
    data: null,
    message: "I am from / url",
    stuats: "OK",
  });
});

// homeRouter.get("/4")

homeRouter.get('/user/:xyz', loginCheck, (req, res) => {
  const params = req.params
  const query = req.query;

  res.json({
    daata: {
      params,
      query
    },
    message: "User Id",
    status: "OK"
  })
})

homeRouter.get("/about-us", (req, res) => {
  // db operation
  // db query
  let data = {
    pageTitle: "Who we are",
    summary: `<p>Broadway Infosys, established in 2008, is the premier professional IT learning destination with a reputation for building global experts over the years.</p><p>We’ve been the front runner in the technological education spanning 70+ technologies, including programming languages, designing, cloud and security, data & AI, graphics/multimedia, digital marketing, tech-based accounting, engineering courses & more.</p><p>We’ve transformed the expertise & industry gap with a remarkable ratio of placements by incorporating the pioneering solutions inside as well as outside the country. Today, our legacy transcends the local borders to the global arena with thousands of IT professionals marking their feat worldwide.</p>`,
    image: "https://broadwayinfosys.com/uploads/banner/1751542485_60565.jpg",
    visionMission: [
      {
        title: "Our Vision",
        description:
          "We are emerging as the premier IT education center beyond our boundaries by generating a talented professional workforce for overall technological advancement.",
      },
      {
        title: "Our Mission",
        description:
          "We are creating a digital tomorrow by empowering people with competent skills & turning them into able IT professionals who can contribute & transform society as a whole.",
      },
    ],
  };

  res.json({
    data: data,
    message: "Successfully fetched About us data",
    status: "OK",
  });
});


module.exports = homeRouter