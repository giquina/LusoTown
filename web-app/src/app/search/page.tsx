"use client";
export const dynamic = 'force-dynamic';

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  MagnifyingGlassIcon,
  FunnelIcon as FilterIcon,
  CalendarDaysIcon,
  BuildingStorefrontIcon,
  UsersIcon,
  DocumentTextIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { search, SearchResult, getSearchCategories } from "@/lib/search";
import Link from "next/link";

function SearchContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";

  const [searchResults, setSearchResults] = useState<{
    events: SearchResult[];
    businesses: SearchResult[];
    groups: SearchResult[];
    pages: SearchResult[];
    all: SearchResult[];
  }>({
    events: [],
    businesses: [],
    groups: [],
    pages: [],
    all: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"relevance" | "date" | "name">(
    "relevance"
  );

  const categories = getSearchCategories(language);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setSearchResults({
          events: [],
          businesses: [],
          groups: [],
          pages: [],
          all: [],
        });
        return;
      }

      setIsLoading(true);
      try {
        const results = await search(query);
        setSearchResults(results);
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults({
          events: [],
          businesses: [],
          groups: [],
          pages: [],
          all: [],
        });
      }
      setIsLoading(false);
    };

    performSearch();
  }, [query]);

  const getFilteredResults = () => {
    const categoryData = categories.find((cat) => cat.id === activeCategory);
    if (!categoryData || activeCategory === "all") {
      return searchResults.all;
    }

    return searchResults.all.filter((result) =>
      categoryData.type.includes(result.type)
    );
  };

  const getSortedResults = (results: SearchResult[]) => {
    if (sortBy === "name") {
      return [...results].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === "date" && results.some((r) => r.date)) {
      return [...results].sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    }
    return results; // Already sorted by relevance
  };

  const filteredResults = getFilteredResults();
  const sortedResults = getSortedResults(filteredResults);
  const totalResults = searchResults.all.length;

  const getResultIcon = (type: string) => {
    switch (type) {
      case "event":
        return <CalendarDaysIcon className="w-5 h-5" />;
      case "business":
        return <BuildingStorefrontIcon className="w-5 h-5" />;
      case "group":
        return <UsersIcon className="w-5 h-5" />;
      case "page":
        return <DocumentTextIcon className="w-5 h-5" />;
      default:
        return <MagnifyingGlassIcon className="w-5 h-5" />;
    }
  };

  const getResultTypeLabel = (type: string) => {
    switch (type) {
      case "event":
        return language === "pt" ? "Evento" : "Event";
      case "business":
        return language === "pt" ? "Negócio" : "Business";
      case "group":
        return language === "pt" ? "Grupo" : "Group";
      case "page":
        return language === "pt" ? "Página" : "Page";
      default:
        return type;
    }
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gray-50">
      <div className="pt-16 w-full">
        {/* Search Header */}
        <section className="py-12 bg-gradient-to-br from-white via-gray-50 to-primary-50/30 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {language === "pt"
                    ? "Pesquisar na Comunidade"
                    : "Search Community"}
                </h1>
                {query && (
                  <p className="text-lg text-gray-600">
                    {t("search.results-for").replace("{query}", query)}
                  </p>
                )}
              </div>

              <SearchBar variant="page" className="mb-6" />

              {/* Results Summary */}
              {query && (
                <div className="flex items-center justify-between text-sm text-gray-600 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                  <span>
                    {language === "pt"
                      ? `${totalResults} resultados encontrados`
                      : `${totalResults} results found`}
                  </span>
                  {isLoading && (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                      {language === "pt" ? "Pesquisando..." : "Searching..."}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Search Results */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {query && (
                <>
                  {/* Filters and Sort */}
                  <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Category Filters */}
                      <div className="flex items-center gap-2">
                        <FilterIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          {language === "pt" ? "Categoria:" : "Category:"}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {categories.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => setActiveCategory(category.id)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                activeCategory === category.id
                                  ? "bg-primary-600 text-white shadow-lg"
                                  : "bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                              }`}
                            >
                              {category.label}
                              {category.id === "all" && totalResults > 0 && (
                                <span className="ml-2 text-xs opacity-75">
                                  ({totalResults})
                                </span>
                              )}
                              {category.id === "events" &&
                                searchResults.events.length > 0 && (
                                  <span className="ml-2 text-xs opacity-75">
                                    ({searchResults.events.length})
                                  </span>
                                )}
                              {category.id === "businesses" &&
                                searchResults.businesses.length > 0 && (
                                  <span className="ml-2 text-xs opacity-75">
                                    ({searchResults.businesses.length})
                                  </span>
                                )}
                              {category.id === "groups" &&
                                searchResults.groups.length > 0 && (
                                  <span className="ml-2 text-xs opacity-75">
                                    ({searchResults.groups.length})
                                  </span>
                                )}
                              {category.id === "pages" &&
                                searchResults.pages.length > 0 && (
                                  <span className="ml-2 text-xs opacity-75">
                                    ({searchResults.pages.length})
                                  </span>
                                )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sort Options */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">
                          {language === "pt" ? "Ordenar por:" : "Sort by:"}
                        </span>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as any)}
                          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="relevance">
                            {language === "pt" ? "Relevância" : "Relevance"}
                          </option>
                          <option value="name">
                            {language === "pt" ? "Nome" : "Name"}
                          </option>
                          <option value="date">
                            {language === "pt" ? "Data" : "Date"}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Search Results */}
                  {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">
                          {language === "pt"
                            ? "Pesquisando..."
                            : "Searching..."}
                        </p>
                      </div>
                    </div>
                  ) : sortedResults.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                      {sortedResults.map((result) => (
                        <Link
                          key={`${result.type}-${result.id}`}
                          href={result.url}
                          className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            {/* Result Icon */}
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 group-hover:bg-primary-200 transition-colors flex items-center justify-center text-primary-600">
                              {getResultIcon(result.type)}
                            </div>

                            {/* Result Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                                    {result.title}
                                  </h3>
                                  <span className="flex-shrink-0 text-xs font-medium text-primary-600 bg-primary-100 px-3 py-1 rounded-full">
                                    {getResultTypeLabel(result.type)}
                                  </span>
                                </div>

                                {result.rating && (
                                  <div className="flex items-center gap-1 text-sm text-yellow-600">
                                    <StarIcon className="w-4 h-4 fill-current" />
                                    <span>{result.rating}</span>
                                  </div>
                                )}
                              </div>

                              <p className="text-gray-600 mb-4 leading-relaxed">
                                {result.description}
                              </p>

                              {/* Result Metadata */}
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                {result.location && (
                                  <div className="flex items-center gap-1">
                                    <MapPinIcon className="w-4 h-4" />
                                    <span>{result.location}</span>
                                  </div>
                                )}

                                {result.date && (
                                  <div className="flex items-center gap-1">
                                    <ClockIcon className="w-4 h-4" />
                                    <span>
                                      {new Date(
                                        result.date
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                )}

                                {result.category && (
                                  <div className="flex items-center gap-1">
                                    <TagIcon className="w-4 h-4" />
                                    <span>{result.category}</span>
                                  </div>
                                )}

                                {result.price !== undefined && (
                                  <div className="flex items-center gap-1 font-semibold text-primary-600">
                                    {result.price === 0
                                      ? language === "pt"
                                        ? "GRÁTIS"
                                        : "FREE"
                                      : `£${result.price}`}
                                  </div>
                                )}
                              </div>

                              {/* Tags */}
                              {result.tags && result.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {result.tags.slice(0, 4).map((tag, index) => (
                                    <span
                                      key={index}
                                      className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {result.tags.length > 4 && (
                                    <span className="text-xs text-gray-500">
                                      +{result.tags.length - 4}{" "}
                                      {language === "pt" ? "mais" : "more"}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : query.trim() ? (
                    <div className="text-center py-20">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {language === "pt"
                          ? "Nenhum resultado encontrado"
                          : "No results found"}
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto mb-6">
                        {language === "pt"
                          ? `Não encontramos resultados para "${query}". Tente palavras-chave diferentes ou verifique a ortografia.`
                          : `We couldn't find any results for "${query}". Try different keywords or check your spelling.`}
                      </p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <p>
                          {language === "pt" ? "Sugestões:" : "Suggestions:"}
                        </p>
                        <ul className="space-y-1">
                          <li>
                            •{" "}
                            {language === "pt"
                              ? "Verifique a ortografia"
                              : "Check your spelling"}
                          </li>
                          <li>
                            •{" "}
                            {language === "pt"
                              ? "Use termos mais gerais"
                              : "Use more general terms"}
                          </li>
                          <li>
                            •{" "}
                            {language === "pt"
                              ? "Tente palavras-chave diferentes"
                              : "Try different keywords"}
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
                        <MagnifyingGlassIcon className="w-12 h-12 text-primary-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {language === "pt"
                          ? "Pesquisar na Comunidade"
                          : "Search the Community"}
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        {language === "pt"
                          ? "Use a barra de pesquisa acima para encontrar eventos, negócios, grupos e conteúdo da comunidade de falantes de português."
                          : "Use the search bar above to find events, businesses, groups, and Portuguese-speaking community content."}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">
          <div className="pt-16 w-full">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading search...</p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
