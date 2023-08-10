using MediatR;

namespace Application.BlogPreviews.Queries.GetAllBlogPreviews
{
    public class GetAllBlogPreviewsQuery : IRequest<List<BlogPreviewDto>>
    {
    }

    public class GetAllBlogPreviewsQueryHandler : IRequestHandler<GetAllBlogPreviewsQuery, List<BlogPreviewDto>> 
    {
        public async Task<List<BlogPreviewDto>> Handle(GetAllBlogPreviewsQuery request, CancellationToken cancellationToken)
        {
            var blogPreviews = new List<BlogPreviewDto>
            {
                new BlogPreviewDto
                { 
                    Id = Guid.NewGuid(),
                    Title = "React 101 : Creating your starter React app using Yarn Berry (yarn@3.3.1)",
                    Content = "In this article I’ll be showing you how to set up a starter react app in windows using the create-react-app command, configure your editor — VS Code, and version control the app.",
                    Url = "https://rimazmohommed523.medium.com/react-101-creating-your-starter-react-app-using-yarn-berry-yarn-3-3-1-e40ed98ec14"
                },
                new BlogPreviewDto
                {
                    Id = Guid.NewGuid(),
                    Title = "React 102 : Configuring code formatting using Prettier, ESLint & Husky",
                    Content = "In this article I’ll be diving into setting up pettier, eslint and husky for configuring the code formatting rules for your react js application. I will be using yarn as my package manager.",
                    Image = "/blog-preview-url/reactjs-v1.jpg",
                    Url = "https://rimazmohommed523.medium.com/react-101-creating-your-starter-react-app-using-yarn-berry-yarn-3-3-1-e40ed98ec14"
                },
                new BlogPreviewDto
                {
                    Id = Guid.NewGuid(),
                    Title = "JMeter Load Testing : Part 1 — Installing JMeter on Windows",
                    Content = "I recently had to run some performance load tests against a number of API apps to make sure they can handle the predicted load and identify the point at which performance degraded and the app needed to scale out. JMeter is a pretty impressive tool that can generate a rich set of reports for analysis and is very simple to configure and run if you come from an IT background.",
                    Image = "/blog-preview-url/jmeter-v1.jpg",
                    Url = "https://rimazmohommed523.medium.com/jmeter-load-testing-part-1-installing-jmeter-on-windows-fa524da15ae0"
                },
                new BlogPreviewDto
                {
                    Id = Guid.NewGuid(),
                    Title = "AZ-303 Azure Architect Technologies : Study Guide",
                    Content = "I passed my AZ-303 exam in June 2021. The exam consisted of around MCQs and 1 case study. What follows is the study guide I created based on the exam skills outline to help me prepare. Hope this helps you too. Cheers!",
                    Image = "/blog-preview-url/azure-architect-study-guide.jpg",
                    Url = "https://rimazmohommed523.medium.com/az-303-azure-architect-technologies-study-guide-e0bb6e3e2ee4"
                }
            };
            return blogPreviews;
        }
    }
}
