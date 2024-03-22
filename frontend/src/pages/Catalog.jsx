// Catalog.ts
import React, { useEffect, useState } from 'react';
import Event from '../components/Event';
import './Catalog.css';

import ABINFTPassFactory from '../assets/ABI/ABINFTPASSFactory.json';
import ABINFTPass from '../assets/ABI/ABINFTPASS.json';

import { ethers } from 'ethers';



const events = [
  {
    "nome": "Bootcamp de Desenvolvimento em Blockchain",
    "descricao": "Aprenda a desenvolver aplicativos descentralizados (DApps) e contratos inteligentes na blockchain Ethereum. Este bootcamp é adequado para desenvolvedores iniciantes e avançados.",
    "dataInicio": "10/04/2024",
    "dataFim": "20/04/2024",
    "horaInicio": "09:00",
    "horaFim": "19:00",
    "autor": "Ada Lovelace",
    "local": "Online",
    "instrucoes": "Traga seu próprio laptop e instale o ambiente de desenvolvimento Ethereum antes do bootcamp.",
    "imagem": null,
    "preco": "0.55",
    "link": "www.youtube.com/bootcampblockchain1",
    "tipo": "normal"
  }
  ];

  async function getProvider() {
    if (!window.ethereum) {
      throw new Error("No wallet found!");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);

    if (!accounts || !accounts.length) {
      throw new Error("Wallet not authorized!");
    }

    return provider;
  }

  async function connectToNFTPass(setNewEvents) {
      try {
        const provider = await getProvider();
        const contract = new ethers.Contract("0xD1BD6caf7354e5e8876A1263A3a3D8621f7abc35", ABINFTPass, provider);

        const PASSInfo = await contract.getPASSInfo();
        console.log('PASSInfo: ', PASSInfo);

        // Acessando elementos individuais do array
          const title = PASSInfo[0];
          const description = PASSInfo[1];
          const startDate = PASSInfo[2];
          const endDate = PASSInfo[3];
          const startTime = PASSInfo[4];
          const endTime = PASSInfo[5];
          const liveDescription = PASSInfo[6];
          const host = PASSInfo[7];
          const imageURI = PASSInfo[8];
          const platform = PASSInfo[9];
          const platformLink = PASSInfo[10];

          setNewEvents([
            {
              "nome": title,
              "descricao": description,
              "dataInicio": startDate,
              "dataFim": endDate,
              "horaInicio": startTime,
              "horaFim": endTime,
              "autor": host,
              "local": platform,
              "instrucoes": liveDescription,
              "imagem": imageURI,
              "preco": "0.55",
              "link": platformLink,
              "tipo": "normal"
            }
            ]);

          console.log('Title:', title);
          console.log('Description:', description);
          console.log('Start Date:', startDate);
          console.log('End Date:', endDate);
          console.log('Start Time:', startTime);
          console.log('End Time:', endTime);
          console.log('Live Description:', liveDescription);
          console.log('Host:', host);
          console.log('Image URI:', imageURI);
          console.log('Platform:', platform);
          console.log('Platform Link:', platformLink);

          
      } catch (error) {
        console.log(error);
      }
  }

const Catalog = () => {

  const [newEvents, setNewEvents] = useState([]);

  useEffect(() => {
    connectToNFTPass(setNewEvents);
  }, []);

  return (
    <div className="catalog">
      <h2>Próximos Eventos</h2>
      <div className="events-list">
        {newEvents.map((event, index) => (
          <Event key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
