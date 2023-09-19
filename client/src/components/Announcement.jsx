import styled, { keyframes } from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  padding-left: 25px;
  font-size: 14px;
  font-weight: 500;
`;
const animated = keyframes`
from {
    transform: translateX(-150%);
    
}
to {
    transform: translateX(350%);
    
}
`;

const Deal = styled.span`
  display: inline-block;
  animation: ${animated} 30s linear infinite;
`;

const Announcement = () => {
  return (
    <Container>
      <Deal>Super Deal! Free Shipping On Orders Overs $50</Deal>
    </Container>
  );
};

export default Announcement;
