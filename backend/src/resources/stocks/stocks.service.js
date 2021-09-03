const debug = require('debug')('service:companys')
const _ = require('lodash')
const { Company } = require('./companies.model')

exports.get_companies = async (code) => {
    try {
        const companies = await Company.find().populate('users', ['_id', 'email', 'role', 'active'])
        return companies
    } catch (error) {
        throw new Error(error)
    }
}

exports.get_company = async (id) => {
    try {
        const company = await Company
            .findById(id)
            .populate('users', ['_id', 'email', 'role', 'active'])

        return company
    } catch (error) {
        throw new Error(error)
    }
}

exports.create_company = async (company) => {
    try {
        const new_company = new Company(company)
        await new_company.save()

        return new_company
    } catch (error) {
        throw new Error(error)
    }
}

exports.find_by_id = async (id) => {
    try {
        const company = await Company.findById(id)
        return company
    } catch (error) {
        throw new Error(error)
    }
}

exports.update_company = async (id, company_edited) => {
    try {
        const options = { runValidators: true, new: true }
        const company = await Company.findByIdAndUpdate(id, company_edited, options)

        return company
    } catch (error) {
        throw new Error(error)
    }
}