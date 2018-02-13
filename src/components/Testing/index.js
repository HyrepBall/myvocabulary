import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

import '../../App.css';

const colors = {
	blue: '#2196F3',
}

class Testing extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			currentAnswerRadioValue: '',
			questionCounter: 1,
			questionRightCounter: 0,
			questionsArray: [],
		};
	}

	componentDidMount() {

		// Для случайного выбора слов в массив вариантов ответа
		function getRandomInt(min, max) {
		  return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		const questionsArray = this.props.vocabularyData.map((el) => {

			// Получаем случайные 6 объектов для вывода в вопрос
			const shuffle = this.props.vocabularyData.sort(() => .5 - Math.random());
			const randomWordsArray = shuffle.map((el) => {
				return el.ru
			}).splice(0,5);
			
			// Вставляем в случайном порядке слово правильного перевода в массив с неправильными переводами
			randomWordsArray.splice(getRandomInt(0, 5), 0, el.ru);

			// Поиск и удаление повторов в массиве
			function noDubs(arr) {
				return arr.reduce((all,item,index)=>{
					if(arr.indexOf(arr[index]) === index){
						all.push(item);
					}
					return all
				},[])
			};
			const clearQuestionsArray = noDubs(randomWordsArray);

			return {
				eng: el.eng,
				ru: el.ru,
				fake: clearQuestionsArray
			} 
		});

		this.setState({
			questionsArray
		});

	}

	handleAnswerRadioChange = (event, value) => {
		this.setState({ currentAnswerRadioValue: value });
	}

	handleNextQuestion = (event, value) => {
		if ( this.state.currentAnswerRadioValue === value.ru ) {
			this.setState({
				questionRightCounter: this.state.questionRightCounter + 1
			})
		}

		this.setState({
			questionCounter: this.state.questionCounter + 1,
			currentAnswerRadioValue: ''
		});
	}

	render() {

		return (
			<div className="app">
				<div>
					<h3>
						Testing
					</h3>
					<Paper style={{ padding: 20, }} >

						<h4 className="testing-title" >Выберите один из вариантов перевода для слова:</h4>
						<p className="testing-subtitle">
							<span className="showIn">
								{`${this.state.questionRightCounter} `}
							</span>
							правильных
						</p>
						{
							// Если счётчик вопроса больше чем длинна масива с вопросами - показать результат
							this.state.questionCounter > this.state.questionsArray.length && 
							this.state.questionsArray.length !== 0
							?
							<h2 className="app-title">
								{`Правильных ответов: ${this.state.questionRightCounter}`}
							</h2>
							:
							this.state.questionsArray.map((trueEl, index) => {

								if ( this.state.questionCounter === index+1 ) {

									const fakeElements = trueEl.fake.map((fakeEl, index) => {
										return (
											<FormControlLabel 
												key={index} 
												style={{ width: '100px', display: 'inline-block', margin: 0 }} 
												value={fakeEl} 
												control={<Radio style={{color: colors.blue,}} />} 
												label={fakeEl} 
											/>
										)
									});

									return (
										<div key={index} className="showIn">
											<div className="question-word">
												{trueEl.eng}	
											</div>
											<div className="question-radios">
												<RadioGroup
													aria-label="gender"
													name="gender1"
													value={this.state.currentAnswerRadioValue}
													onChange={this.handleAnswerRadioChange}
													style={{ display: 'block', width: '100%', textAlign: 'center' }}
												>
													{fakeElements}
												</RadioGroup>
											</div>
											<div style={{ textAlign: 'center' }} >
												<Button 
													raised="true"
													size="small" 
													style={{ backgroundColor: colors.blue, color: '#fff', }} 
													onClick={(e) => this.handleNextQuestion(e, trueEl) }
												>
													Далее
												</Button>
											</div>
										</div>
									)
								}
							})
						}
					</Paper>
				</div>
			</div>
		);
	}
}

Testing.propTypes = {
  vocabularyData: PropTypes.array.isRequired,
}

export default connect(
	state => ({
		vocabularyData: state.vocabularyStore
	}),
	dispatch => ({
	})
)(Testing);
