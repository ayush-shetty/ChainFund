<p align="center"><img width="250" alt="faviicon" src="https://user-images.githubusercontent.com/124496931/232869863-63114238-d065-4cef-85d2-126336d3d755.png"></p>


# ChainFund - A web3 and AI based crowdfunding platform

ChainFund is a crowdfunding platform built on React that operates on a decentralized web. Its smart contract ensures transparency and trustworthiness by preventing malicious third parties from interfering with the fundraising process. Users can browse and select campaigns, donate using Ether through Metamask, and create their own campaigns with specific deadlines and goals. The platform's AI search feature allows users to describe the campaigns they want to donate to in their own words, and the system will filter the results automatically, making navigation easy and intuitive. This was done using Google Cloud NLP accessed through Fastapi.The project provides a secure and transparent platform for fundraising while leveraging cutting-edge technologies like blockchain and AI while having a user friendly interface.

## Deployment
Clone the project
```bash
  git clone https://github.com/ayush-shetty/ChainFund
```


Install dependencies in api directory

```bash
  pip install
```

To run the server

```bash
  python -m uvicorn app:api --reload 
```

Install dependencies in root, client and web3 directories

```bash
  npm install
```

To run the application from the client directory

```bash
  npm run dev 
```

## Solving-for-India Hackathon video
[![Watch the video](https://user-images.githubusercontent.com/124496931/233275360-6359dd18-5050-4ba1-8867-c2c083f3330f.jpeg)](https://drive.google.com/file/d/19DpMn3s5R-408GLPrlLeCR08Vbe8fXtY/view?usp=sharing)

