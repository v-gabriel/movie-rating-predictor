using AutoMapper;

namespace MovieRatingPredictor.Model.Mapping;

public static class MappingExpressionExtensions
{
    public static IMappingExpression<TSource, TDest> IgnoreAllUnmapped<TSource, TDest>(
        this IMappingExpression<TSource, TDest> expression)
    {
        expression.ForAllMembers(opt => opt.Ignore());
        return expression;
    }
}