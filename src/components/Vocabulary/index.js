import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table, { 
	TableBody, 
	TableCell, 
	TableHead, 
	TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui-icons/Add';
import Edit from 'material-ui-icons/Edit';
import Delete from 'material-ui-icons/Delete';
import Check from 'material-ui-icons/Check';

import '../../App.css';

const colors = {
	blue: '#2196F3',
}

class Vocabulary extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			questionsArray: [],
			addWordInputs: {
				id: '',
				eng: '',
				ru: '',
			},
			editWordInputs: {
				id: '',
				eng: '',
				ru: '',
			},
		};
	}

	componentDidMount() {

		function getRandomInt(min, max) {
		  return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		const questionsArray = this.props.vocabularyData.map((el) => {

			const shuffle = this.props.vocabularyData.sort(() => .5 - Math.random());
			const randomWordsArray = shuffle.map((el) => {
				return el.ru
			}).splice(0,5);
			
			randomWordsArray.splice(getRandomInt(0, 5), 0, el.ru);

			// Поиск и удаление дублей в массиве
			function noDubs(arr) {
				return arr.reduce((all,item,index)=>{
					if(arr.indexOf(arr[index]) === index){
						all.push(item);
					}
					return all
				},[])
			};

			return {
				eng: el.eng,
				ru: el.ru,
				fake: noDubs(randomWordsArray)
			} 
		});

		this.setState({
			questionsArray
		});

	}

	handleAddWord = (e) => {
		if ( 
			this.state.addWordInputs.eng !== '' && 
			this.state.addWordInputs.ru !== '' 
		) {
			this.props.onAddWord(this.state.addWordInputs);
		}
		else {
			alert('Заполните оба поля')
		}
	}

	handleAddWordEng = (e, id) => {
		this.setState({
			addWordInputs: {
				id: Date.now().toString(),
				eng: e.target.value,
				ru: this.state.addWordInputs.ru,
				enableEdit: false,
			}
		});
	}

	handleAddWordRu = (e) => {
		this.setState({
			addWordInputs: {
				id: Date.now().toString(),
				eng: this.state.addWordInputs.eng,
				ru: e.target.value,
				enableEdit: false,
			}
		});
		
	}

	handleDeleteWord = (e, index) => {
		this.props.onDeleteWord(index);
	}

	handleEditWord = (e, index, n) => {
		this.props.onEditWord(index)
	}

	handleEditSaveWord = (e, index, n) => {

		var editedObj = {
			id: n.id, 
			eng: this.state.editWordInputs.eng === '' ? n.eng : this.state.editWordInputs.eng  , 
			ru: this.state.editWordInputs.ru === '' ? n.ru :  this.state.editWordInputs.ru  , 
			enableEdit: !n.enableEdit
		}

		this.props.onSaveWord(editedObj, index)

	}

	handleEditWordEng = (e, n) => {
		this.setState({
			editWordInputs: {
				id: n.id,
				eng: e.target.value,
				ru: this.state.editWordInputs.ru === '' ? n.ru :  this.state.editWordInputs.ru,
				enableEdit: n.enableEdit,
			}
		});
	}

	handleEditWordRu = (e, n) => {
		this.setState({
			editWordInputs: {
				id: n.id,
				eng: this.state.editWordInputs.eng === '' ? n.eng : this.state.editWordInputs.eng,
				ru: e.target.value,
				enableEdit: n.enableEdit,
			}
		});
	}

	render() {

		return (

				<div className="vocabulary-container">
					<div className="vocabulary-add-form">
						<TextField
							id="eng"
							label="English"
							style={{ margin: '0 20px 0 0', }}
							onChange={e => this.handleAddWordEng(e)}
						/>
						<TextField
							id="ru"
							label="Русский"
							style={{ margin: '0 20px 0 0', }}
							onChange={e => this.handleAddWordRu(e)}
						/>
						<Button raised color="default" onClick={(e) => this.handleAddWord(e) }>
							ADD
							<Add/>
						</Button>
					</div>

					<Paper >
						<Table >
							<TableHead>
								<TableRow>
									<TableCell style={{ fontSize: 14, color: '#111', fontWeight: 900, }} >English</TableCell>
									<TableCell style={{ fontSize: 14, color: '#111', fontWeight: 900, }} >Русский</TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>

							<TableBody style={{  }} >
								{this.props.vocabularyData.map((n, index) => {

									return (
										<TableRow
											hover
											tabIndex={-1}
											key={index}
											className="showIn"
										>
											<TableCell style={{ width: '200px', }} >
												{
													n.enableEdit ? 
													(
														<TextField
															defaultValue={n.eng}
															className="showIn"
															onChange={e => this.handleEditWordEng( e, n )}
															inputProps={{
																'aria-label': 'Description',
															}}
														/>
													) :
													<div className="showIn">{n.eng}</div>
												}
											</TableCell>
											<TableCell style={{ width: '200px', }} >
												{
													n.enableEdit ? 
													(
														<TextField
															defaultValue={n.ru}
															className="showIn"
															onChange={e => this.handleEditWordRu( e, n )}
															inputProps={{
																'aria-label': 'Description',
															}}
														/>
													) :
													<div className="showIn">{n.ru}</div>
												}
											</TableCell>
											<TableCell numeric>
												<IconButton >
												{
													n.enableEdit ? 
													<Check 
														className="showIn"
														style={{ color: '#00C853', }} 
														onClick={e => this.handleEditSaveWord(e, index, n  )} 
													/> :
													<Edit 
														className="showIn"
														style={{ color: colors.blue, }} 
														onClick={e => this.handleEditWord(e, index, n  )} 
													/> 
												}
												</IconButton>
												<IconButton >
													<Delete style={{ color: '#F44336', }} onClick={e => this.handleDeleteWord(e, index)}/>
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</Paper>
				</div>
		);
	}
}

Vocabulary.propTypes = {
  onAddWord: PropTypes.func.isRequired,
  onDeleteWord: PropTypes.func.isRequired,
  onEditWord: PropTypes.func.isRequired,
  onSaveWord: PropTypes.func.isRequired,
}

export default connect(
	state => ({
		vocabularyData: state.vocabularyStore
	}),
	dispatch => ({
		onAddWord: (wordObj) => {
			dispatch({ type: 'ADD_WORD', payload: wordObj })
		},
		onDeleteWord: (index) => {
			dispatch({ type: 'DELETE_WORD', payload: index  })
		},
		onEditWord: (wordObj) => {
			dispatch({ type: 'ENABLE_EDIT_WORD', payload: wordObj  })
		},
		onSaveWord: (wordObj, index ) => {
			dispatch({ type: 'SAVE_EDIT_WORD', payload: {wordObj, index}  })
		},
	})
)(Vocabulary);

