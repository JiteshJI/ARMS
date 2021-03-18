namespace ODOT.ARMS.Web.UnitTests
{
    public class SampleDataControllerShould
    {

        //private Mock<IWarehouseDataRepository> _mockWarehouseDataRepository;
        //private IMapper _mapper;

        //public SampleDataControllerShould()
        //{
        //    _mockWarehouseDataRepository = new Mock<IWarehouseDataRepository>();

        //    var configuration = new MapperConfiguration(config => {
        //        config.CreateMap<Entities.County, DTOs.CountyForDD>()
        //            .ForMember(d => d.Id, o => o.MapFrom(s => s.CountyId));
        //    });
        //    _mapper = new Mapper(configuration);
        //}

        //[Fact]
        //public async Task GetCountiesWithOkResultAsync()
        //{
        //    /* Setup */
        //    var counties = new List<Entities.County> {
        //        new Entities.County { CountyId = "ADA", Abbrev4 = "ADAM", Name = "ADAMS" },
        //        new Entities.County { CountyId = "ALL", Abbrev4 = "ALLE", Name = "ALLEN" }
        //    };

        //    _mockWarehouseDataRepository.Setup(pr => pr.GetAllCountiesAsync()).Returns(Task.FromResult(counties));

        //    /* Setup SampleDataController */
        //    var sampleDataController = new SampleDataController(_mapper, _mockWarehouseDataRepository.Object);

        //    /* Act */
        //    var result = await sampleDataController.GetCounties();

        //    /* Assert */
        //    /* Assert Ok is returned */
        //    Assert.IsType<OkObjectResult>(result);

        //    /* Assert that the result is not null */
        //    Assert.NotNull(result);

        //    var dto = ((result as OkObjectResult).Value as IEnumerable<DTOs.CountyForDD>);
        //    /* Assert the value of the returned result is not null */
        //    Assert.NotNull(dto);
        //    Assert.NotEmpty(dto);
        //    Assert.Equal(counties.First().CountyId, dto.First().Id);
        //    Assert.Equal(counties.First().Name, dto.First().Name);
        //}

        //[Fact]
        //public async Task GetCountyWithOkResultAsync()
        //{
        //    /* Setup */
        //    var county = new Entities.County { CountyId = "ADA", Abbrev4 = "ADAM", Name = "ADAMS" };

        //    _mockWarehouseDataRepository.Setup(pr => pr.GetCountyByIdAsync(It.IsAny<string>())).Returns(Task.FromResult(county));

        //    /* Setup SampleDataController */
        //    var sampleDataController = new SampleDataController(_mapper, _mockWarehouseDataRepository.Object);

        //    /* Act */
        //    var result = await sampleDataController.GetCounty("ADA");

        //    /* Assert */
        //    /* Assert Ok is returned */
        //    Assert.IsType<OkObjectResult>(result);

        //    /* Assert that the result is not null */
        //    Assert.NotNull(result);

        //    var dto = ((result as OkObjectResult).Value as DTOs.CountyForDD);
            
        //    /* Assert the value of the returned result is not null */
        //    Assert.NotNull(dto);
        //    Assert.Equal(county.CountyId, dto.Id);
        //    Assert.Equal(county.Name, dto.Name);
        //}

        //[Fact]
        //public async Task GetCountyWithBadRequestResultAsync()
        //{
        //    /* Setup */
        //    _mockWarehouseDataRepository.Setup(pr => pr.GetCountyByIdAsync(It.IsAny<string>())).Returns(Task.FromResult<Entities.County>(null));

        //    /* Setup SampleDataController */
        //    var sampleDataController = new SampleDataController(_mapper, _mockWarehouseDataRepository.Object);

        //    /* Act */
        //    var result = await sampleDataController.GetCounty("FOO");

        //    /* Assert */
        //    /* Assert BadRequest is returned */
        //    Assert.IsType<BadRequestResult>(result);
        //}

    }
}
