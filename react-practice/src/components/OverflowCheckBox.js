import styled from 'styled-components';
import useCarousel from '../hooks/useCarousel';

const StyledOverflowCheckBox = styled.input`
`;
const OverflowCheckBox = () => {
    const { hidden, setHidden } = useCarousel();
    const handleChange = () => {
        setHidden(() => !hidden);
        console.log(hidden);
        document.querySelector('.carousel').classList.toggle('hidden');
    }
    return(
        <div>
            <label htmlFor="overflow">
                carousel 
                <b>overflow: hidden</b>
            </label>
            <StyledOverflowCheckBox type="checkbox" id="overflow" defaultChecked onChange={handleChange}/>
        </div>
    )
}

export default OverflowCheckBox;