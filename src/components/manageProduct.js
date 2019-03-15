import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHeaad from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Axios from 'axios';
import { Button, Icon, Input, Label } from 'semantic-ui-react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { urlApi } from '../support/urlApi';
import PageNotFound from '../components/pageNotFound';

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});

class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }
}

TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class CustomPaginationActionsTable extends React.Component {
    state = {
        rows: [],
        page: 0,
        rowsPerPage: 5,
        isEdit: false,
        editItem: {}
    };

    componentDidMount() {
        this.getDataApi()
    }

    getDataApi = () => {
        Axios.get(urlApi + '/products')
            .then((res) => this.setState({ rows: res.data }))
            .catch((err) => console.log(err))
    }

    btnDelete = (id) => {
        Axios.delete(urlApi + '/products/' + id)
            .then((res) => {
                this.getDataApi()
            })
            .catch((err) => console.log(err))

    }

    btnEdit = (param) => {
        this.setState({ isEdit: true, editItem: param })

    }

    btnSave = () => {
        var nama = this.namaEdit.inputRef.value === '' ? this.state.editItem.nama : this.namaEdit.inputRef.value
        var harga = this.hargaEdit.inputRef.value === '' ? this.state.editItem.harga : this.hargaEdit.inputRef.value
        var disc = this.discEdit.inputRef.value === '' ? this.state.editItem.disc : this.discEdit.inputRef.value
        var desc = this.descEdit.inputRef.value === '' ? this.state.editItem.desc : this.descEdit.inputRef.value
        var ctgry = this.ctgryEdit.inputRef.value === '' ? this.state.editItem.ctgry : this.ctgryEdit.inputRef.value
        var img = this.imgEdit.inputRef.value === '' ? this.state.editItem.img : this.imgEdit.inputRef.value
        var newData = {nama,harga,diskon:disc,desc,category:ctgry,img}

        Axios.put(urlApi+'/products/'+this.state.editItem.id , newData)
        .then((res)=>{
            swal("Edited", "Edited product has been saved", "success")
            this.getDataApi()
            this.setState({isEdit: false})
        })
        .catch((err)=>{
            console.log(err)
        })

        this.namaEdit.inputRef.value = ''
        this.hargaEdit.inputRef.value = ''
        this.discEdit.inputRef.value = ''
        this.descEdit.inputRef.value = ''
        this.ctgryEdit.inputRef.value = ''
        this.imgEdit.inputRef.value = ''
    }

    btnCancel = () => {
        this.setState({isEdit: false, editItem:{}})
    }

    btnAdd = () => {
        var nama = this.nama.inputRef.value
        var harga = parseInt(this.harga.inputRef.value)
        var disc = parseInt(this.disc.inputRef.value)
        var desc = this.desc.inputRef.value
        var ctgry = this.ctgry.inputRef.value
        var img = this.img.inputRef.value

        Axios.post(urlApi + '/products', {
            nama: nama,
            harga: harga,
            diskon: disc,
            desc: desc,
            category: ctgry,
            img: img,
        })

            .then((res) => {
                console.log(res)
                swal("Success!", "New product has been added!", "success");
                this.getDataApi()
            })
            .catch((err) => console.log(err))
        
        this.nama.inputRef.value = ''
        this.harga.inputRef.value = ''
        this.disc.inputRef.value = ''
        this.desc.inputRef.value = ''
        this.ctgry.inputRef.value = ''
        this.img.inputRef.value = ''

        }

    renderJsx = () => {
        var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((val) => {
            return (
                <TableRow key={val.id}>
                    <TableCell align="left">{val.id}</TableCell>
                    <TableCell component="th" scope="row">
                        {val.nama}
                    </TableCell>
                    <TableCell align="left">Rp {val.harga}</TableCell>
                    <TableCell align="left">{val.diskon}</TableCell>
                    <TableCell align="left">{val.category}</TableCell>
                    <TableCell><img src={val.img} width='50px' alt='product img' /></TableCell>
                    <TableCell align="left">{val.desc}</TableCell>
                    <TableCell>
                        <Button animated color='instagram' onClick={() => this.btnEdit(val)}>
                            <Button.Content visible>Edit</Button.Content>
                            <Button.Content hidden>
                                <Icon name='edit' />
                            </Button.Content>
                        </Button>

                        <Button animated color='red' onClick={() => this.btnDelete(val.id)}>
                            <Button.Content visible>Delete</Button.Content>
                            <Button.Content hidden>
                                <Icon name='delete' />
                            </Button.Content>
                        </Button>
                    </TableCell>

                </TableRow>
            )
        })
        return jsx
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { rows, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        var {nama,harga,diskon,desc,img,category} = this.state.editItem;


        if(this.props.role==='admin'){
        return (
            <div>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableHeaad>
                                <TableRow>
                                    <TableCell style={{ fontSize: "20px" }}>ID</TableCell>
                                    <TableCell style={{ fontSize: "20px" }}>NAMA</TableCell>
                                    <TableCell style={{ fontSize: "20px" }}>HARGA</TableCell>
                                    <TableCell style={{ fontSize: "20px" }}>DISCOUNT</TableCell>
                                    <TableCell style={{ fontSize: "20px" }}>CATEGORY</TableCell>
                                    <TableCell style={{ fontSize: "20px" }}>IMG</TableCell>
                                    <TableCell style={{ fontSize: "20px" }}>DESKRIPSI</TableCell>
                                </TableRow>
                            </TableHeaad>
                            <TableBody>
                                {this.renderJsx()}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 48 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        colSpan={3}
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActionsWrapped}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </Paper>

                <Paper className='mt-3'>
                    <Table>
                        <TableHeaad>
                            <TableRow>
                                <TableCell style={{ fontSize: "20px" }}>ADD PRODUCT</TableCell>
                            </TableRow>
                        </TableHeaad>

                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Input ref={input => this.nama = input} placeholder="Nama Produk" className='mt-2 ml-2 mb-2' />

                                    <Input ref={input => this.harga = input} className='mt-2 ml-2 mb-2' labelPosition='right' type='number' placeholder='Harga'>
                                        <Label basic>Rp</Label>
                                        <input />
                                        <Label>,00</Label>
                                    </Input>

                                    <Input type='number' ref={input => this.disc = input} placeholder="Discount" className='mt-2 ml-2 mb-2' />
                                    <Input ref={input => this.ctgry = input} placeholder="Category" className='mt-2 ml-2 mb-2' />
                                    <Input ref={input => this.img = input} placeholder="Image" className='mt-2 ml-2 mb-2' />
                                    <Input ref={input => this.desc = input} placeholder="Deskripsi" className='mt-2 ml-2 mb-2' />

                                    <Button animated color='instagram' onClick={this.btnAdd} className='mt-2 ml-2 mb-2'>
                                        <Button.Content visible>Add Product</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='add' />
                                        </Button.Content>
                                    </Button>
                                </TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>

                {/*Edit Product */}

                {
                    this.state.isEdit === true ?
                        <Paper className='mt-3'>
                            <Table>
                                <TableHeaad>
                                    <TableRow>
                                        <TableCell style={{ fontSize: "20px" }}>EDIT PRODUCT {' ' + this.state.editItem.nama} </TableCell>
                                    </TableRow>
                                </TableHeaad>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Input ref={input => this.namaEdit = input} placeholder={nama} className='mt-2 ml-2 mb-2' />

                                            <Input ref={input => this.hargaEdit = input} className='mt-2 ml-2 mb-2' labelPosition='right' type='number' placeholder={harga} >
                                                <Label basic>Rp</Label>
                                                <input />
                                                <Label>,00</Label>
                                            </Input>

                                            <Input type='number' ref={input => this.discEdit = input} placeholder={diskon} className='mt-2 ml-2 mb-2' />
                                            <Input ref={input => this.ctgryEdit = input} placeholder={category} className='mt-2 ml-2 mb-2' />
                                            <Input ref={input => this.imgEdit = input} placeholder={img} className='mt-2 ml-2 mb-2' />
                                            <Input ref={input => this.descEdit = input} placeholder={desc} className='mt-2 ml-2 mb-2' />

                                            <Button animated color='instagram' onClick={this.btnSave} className='mt-2 ml-2 mb-2'>
                                                <Button.Content visible>Save</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name='save' />
                                                </Button.Content>
                                            </Button>
                                            <Button animated color='red' onClick={this.btnCancel}>
                                                <Button.Content visible>Cancel</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name='cancel' />
                                                </Button.Content>
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                        : null
                }
            </div>
        );
    } return <PageNotFound/>
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return{
        role: state.user.role
    }

}

export default connect(mapStateToProps)(withStyles(styles)(CustomPaginationActionsTable));