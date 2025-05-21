import { useState } from 'react';
import {useSelector} from 'react-redux';
import {selectAll} from '../heroesFilters/filtersSlice';
import store from '../../store';
import { v4 as uuidv4 } from 'uuid';
import { useCreateHeroMutation } from '../../api/apiSlice';

const HeroesAddForm = () => {
	const [heroName, setHeroName] = useState('');
	const [heroDescription, setHeroDescription] = useState('');
	const [heroElement, setHeroElement] = useState('');

	const [createHero] = useCreateHeroMutation();

	const {filtersLoadingStatus} = useSelector(state => state.filters);
	const filters = selectAll(store.getState());

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const newHero = {
			id: uuidv4(),
			name: heroName,
			description: heroDescription,
			element: heroElement
		}
		createHero(newHero).unwrap();
		
		setHeroName('');
		setHeroDescription('');
		setHeroElement('');
	}

	const renderFilters = (arr, status) => {
		if (status === "loading") {
			return <option>loading...</option>
		} else if (status === "error" || arr.length === 0) {
			return <option>Loading error</option>
		}
		return arr.filter(item => item.name !== 'all').map(({name, label}) => {
			return (
				<option key={name}  value={name}>{label}</option>
			)
		})
	}

	const options = renderFilters(filters, filtersLoadingStatus);

    return (
        <form 
			onSubmit={onSubmitHandler}
			className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">New hero's name</label>
                <input 
                    required
					type="text" 
					id="name" 
                    name="name" 
					value={heroName}
					onChange={(e)=> setHeroName(e.target.value)}
                    className="form-control" 
                    placeholder="What is my name?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
					id="text" 
                    name="text" 
					value={heroDescription}
					onChange={(e)=>setHeroDescription(e.target.value)}
                    className="form-control" 
                    placeholder="What can I do?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Select hero's element</label>
                <select 
                    required
					id="element" 
					name="element"
					value={heroElement}
					onChange={(e)=> setHeroElement(e.target.value)}
                    className="form-select">
						<option >I own the element...</option>
					{options}
                </select>
            </div>

            <button 
				type="submit" 
				className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;