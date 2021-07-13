import styled from 'styled-components'

const Button = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2em;
    color: #fff;
    background-color: transparent;
    border-color: transparent;
    cursor: pointer;
    z-index: 99;
    &:focus {
        outline: none;
    }
`;
const StyledLeftBtn = styled(Button)`
    left: 0;
`;
const StyledRightBtn = styled(Button)`
    right: 0;
`;

const Buttons = ({ handleClick }) => {
    return(
        <>
            <StyledLeftBtn id="prev" onClick={handleClick}>&laquo;</StyledLeftBtn>
            <StyledRightBtn id="next" onClick={handleClick}>&raquo;</StyledRightBtn>
        </>
    )
}
export default Buttons;