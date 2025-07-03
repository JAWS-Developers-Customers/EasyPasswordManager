import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animazione per il logo
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

// Animazione di dissolvenza per il testo
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const LoadingScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f9fc;
`;

const LoadingScreenContainerLocal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  animation: ${bounce} 1.5s ease-in-out infinite;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-top: 20px;
  animation: ${fadeIn} 1s ease-in-out forwards;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  max-width: 300px;
  margin-top: 10px;
  animation: ${fadeIn} 1s ease-in-out forwards;
  animation-delay: 0.5s;
`;

const LoadingScreenGlobal: React.FC<{ percentage?: string, addInfo?: string }> = ({ percentage = "", addInfo = "" }) => {
    return (
        <LoadingScreenContainer>
            <Logo src="https://assets.sportifyapp.co/images/CompactSportify.png" alt="Logo" />
            <Title>Caricamento in corso...</Title>
            {percentage != "" ? <Title>{percentage}%</Title> : null}
            {addInfo != "" ? <Title>{addInfo}</Title> : null}
            <Description>Attendere qualche istante mentre prepariamo tutto per te.</Description>
        </LoadingScreenContainer>
    );
};

const LoadingScreenLocal: React.FC = () => {
    return (
        <LoadingScreenContainerLocal>
            <Logo src="https://assets.sportifyapp.co/images/CompactSportify.png" alt="Logo" />
            <Title>Caricamento in corso...</Title>
            <Description>Attendere qualche istante mentre prepariamo tutto per te.</Description>
        </LoadingScreenContainerLocal>
    );
};

export { LoadingScreenGlobal, LoadingScreenLocal };