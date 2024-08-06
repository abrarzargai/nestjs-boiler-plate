import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CountryService } from "./country.service";
import { CreateCountryDto } from "./dto/create-country.dto";
import { Country } from "./entities/country.entity";
import { UpdateCountryDto } from "./dto/update-country.dto";
import { UseGuards } from "@nestjs/common";
import { TokenGuard } from "src/common/guards/auth.guards";

@Resolver(() => Country)
export class CountryResolver {
    constructor(private readonly countryService: CountryService) { }

    @Query(() => [Country], { name: "findAllCountries" })
    /**
     * Query to fetch all countries.
     * 
     * Example query in GraphQL Playground:
     * 
     * ```graphql
     * query {
     *   findAllCountries {
     *     id
     *     name
     *     // Add other fields as necessary
     *   }
     * }
     * ```
     */
    @UseGuards(TokenGuard)
    async findAllCountries(): Promise<Country[]> {
        return this.countryService.findAll({});
    }

    @Query(() => Country, { name: "getCountryById" })
    /**
     * Query to fetch a country by its ID.
     * 
     * Example query in GraphQL Playground:
     * 
     * ```graphql
     * query {
     *   getCountryById(id: "some-country-id") {
     *     id
     *     name
     *     // Add other fields as necessary
     *   }
     * }
     * ```
     * Replace `"some-country-id"` with the actual country ID you want to query.
     */
    async getCountryById(@Args('id', { type: () => String }) id: string): Promise<Country> {
        return this.countryService.findOne({ where: { id } });
    }

    @Mutation(() => Country, { name: "createCountry" })
    /**
     * Mutation to create a new country.
     * 
     * Example mutation in GraphQL Playground:
     * 
     * ```graphql
     * mutation {
     *   createCountry(createCountryDto: {
     *     name: "New Country Name"
     *     // Add other fields as necessary
     *   }) {
     *     id
     *     name
     *     // Add other fields as necessary
     *   }
     * }
     * ```
     */
    async createCountry(@Args('createCountryDto') createCountryDto: CreateCountryDto): Promise<Country> {
        return this.countryService.create(createCountryDto);
    }

    @Mutation(() => Number, { name: "deleteCountry" })
    /**
     * Mutation to delete a country by its ID.
     * 
     * Example mutation in GraphQL Playground:
     * 
     * ```graphql
     * mutation {
     *   deleteCountry(id: "some-country-id")
     * }
     * ```
     * Replace `"some-country-id"` with the actual country ID you want to delete.
     */
    async deleteCountry(@Args('id', { type: () => String }) id: string): Promise<number> {
        console.log("Deleting country with ID:", id);
        const { affected } = await this.countryService.softDelete({ id });
        return affected;
    }

    @Query(() => Number, { name: "countCountries" })
    /**
     * Query to count the total number of countries.
     * 
     * Example query in GraphQL Playground:
     * 
     * ```graphql
     * query {
     *   countCountries
     * }
     * ```
     */
    async countCountries(): Promise<number> {
        return this.countryService.count({});
    }

    @Mutation(() => Country, { name: "updateCountry" })
    /**
     * Mutation to update an existing country.
     * 
     * Example mutation in GraphQL Playground:
     * 
     * ```graphql
     * mutation {
     *   updateCountry(
     *     id: "some-country-id",
     *     updateCountryDto: {
     *       name: "Updated Country Name"
     *       // Add other fields as necessary
     *     }
     *   ) {
     *     id
     *     name
     *     // Add other fields as necessary
     *   }
     * }
     * ```
     * Replace `"some-country-id"` with the actual country ID you want to update.
     */
    async updateCountry(
        @Args('id', { type: () => String }) id: string,
        @Args('updateCountryDto') updateCountryDto: UpdateCountryDto
    ): Promise<Country> {
        await this.countryService.update({ id }, updateCountryDto);
        return this.countryService.findOne({ where: { id } });
    }

    @Query(() => [Country], { name: "findCountriesWithPagination" })
    /**
     * Query to fetch countries with pagination.
     * 
     * Example query in GraphQL Playground:
     * 
     * ```graphql
     * query {
     *   findCountriesWithPagination(page: 1, limit: 10) {
     *     id
     *     name
     *     // Add other fields as necessary
     *   }
     * }
     * ```
     * Adjust `page` and `limit` as needed for pagination.
     */
    async findCountriesWithPagination(
        @Args('page', { type: () => Number, nullable: true }) page: number = 1,
        @Args('limit', { type: () => Number, nullable: true }) limit: number = 10
    ): Promise<Country[]> {
        return this.countryService.findAll({
            skip: (page - 1) * limit,
            take: limit
        });
    }
}
