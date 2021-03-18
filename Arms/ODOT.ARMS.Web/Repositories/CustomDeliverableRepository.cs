using AutoMapper;
using ODOT.ARMS.Web.Entities;
using ODOT.ARMS.Web.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ODOT.ARMS.Web.DTOs;

namespace ODOT.ARMS.Web.Repositories
{
    public class CustomDeliverableRepository : ICustomDeliverableRepository
    {
        private ARMSContext _context;
        private EventRepository _eventRepository;
        private IMapper _mapper;
        public CustomDeliverableRepository(ARMSContext context, IMapper mapper
        //EventRepository eventRepositor
        )
        {
            _context = context;
            _mapper = mapper;
            //   _eventRepository=eventRepository;
        }

        public void AddCustomDeliverable(IEnumerable<ProjDeliverables> projectDeliverables, Guid projId)
        {
            if (projectDeliverables != null)
            {
                foreach (var projectDeliverable in projectDeliverables)
                {
                    projectDeliverable.DeliverableId = null;
                    projectDeliverable.UserId = "Manoj";
                    projectDeliverable.ProjectId = projId;
                    ArmsDeliverables armsDeliverableToAdd = _mapper.Map<ArmsDeliverables>(projectDeliverable);
                    armsDeliverableToAdd.ArmsProjectDeliverables = new List<Entities.ArmsProjectDeliverables>();
                    /* updating the record in the associated project Deliverables table with foreign key */
                    armsDeliverableToAdd.ArmsProjectDeliverables.Add(new Entities.ArmsProjectDeliverables
                    {
                        ProjId = projId,
                        UserId = armsDeliverableToAdd.UserId
                    });
                    _context.ArmsDeliverables.Add(armsDeliverableToAdd);
                    _context.SaveChanges();

                }
            }

        }

        public void AddProjectDeliverable(IEnumerable<ProjDeliverables> projectDeliverables)
        {
            foreach (var projectDeliverable in projectDeliverables)
            {
                ArmsProjectDeliverables armsProjectDeliverableToAdd = _mapper.Map<ArmsProjectDeliverables>(projectDeliverable);
                armsProjectDeliverableToAdd.ProjId = (Guid)projectDeliverable.ProjectId;
                _context.ArmsProjectDeliverables.Add(armsProjectDeliverableToAdd);
                _context.SaveChanges();

            }
        }

        public void UpdateCustomDeliverable(ICollection<ProjDeliverables> projectDeliverables, Guid ProjId, int projectAltId)
        {
            foreach (var projectDeliverable in projectDeliverables)
            {
                projectDeliverable.UserId = "Manoj";
                projectDeliverable.ProjectId = ProjId;
            }

            /* get the list to add */
            var newProjDeliverables = (from projDeliverables in projectDeliverables.Where(d => d.DeliverableId != null)
                                      select  projDeliverables).ToList();

            var newArmsDeliverables = (from projDeliverables in projectDeliverables.Where(d => d.DeliverableType != "S")
                                      select projDeliverables).ToList();

            /* get the list to update */
            var modArmsDeliverables = from pd in projectDeliverables
                                      join ad in _context.ArmsDeliverables on pd.DeliverableId equals ad.DeliverableId
                                      where ad.ProjAltId == projectAltId
                                      select pd;

            var modProjDeliverables = from pd in projectDeliverables
                                      join d in _context.ArmsProjectDeliverables on pd.ProjectDeliverableId equals d.ProjectDeliverableId
                                      select pd;

            /* get the list to delete */
            var existingProjDeliverables = (from d in _context.ArmsProjectDeliverables.Where(x => x.ProjId == ProjId)
                                            select d).ToList();

            var existingArmsDeliverables = (from ad in _context.ArmsDeliverables.Where(x => x.ProjAltId == projectAltId)
                                            select ad).ToList();
            /*
            var delProjDeliverables = from ePd in existingProjDeliverables
                                      where !projectDeliverables.Any(x => x.ProjectDeliverableId == ePd.ProjectDeliverableId)
                                      select ePd;
            var delArmsDeliverables = from eAd in existingArmsDeliverables
                                      where !projectDeliverables.Any(x => x.DeliverableId == eAd.DeliverableId)
                                      select eAd;
 
            */

            /* perform the update */
            //     UpdateArmsProjectDeliverable(modProjDeliverables);
            //     UpdateArmsDeliverable(modArmsDeliverables);


            /* perform the delete */
            DeleteArmsProjectDeliverable(existingProjDeliverables);
            DeleteArmsDeliverable(existingArmsDeliverables);

            /* perform the add */
            AddCustomDeliverable(newArmsDeliverables, ProjId);
            AddProjectDeliverable(newProjDeliverables);
        }




        public void DeleteArmsProjectDeliverable(IEnumerable<ArmsProjectDeliverables> projectDeliverables)
        {

            foreach (var projDeliverable in projectDeliverables)
            {
                ArmsProjectDeliverables armsProjDeliverableToDelete = _mapper.Map<ArmsProjectDeliverables>(projDeliverable);
                _context.ArmsProjectDeliverables.Update(armsProjDeliverableToDelete);
                _context.Attach(armsProjDeliverableToDelete);
                _context.Entry(armsProjDeliverableToDelete).State = EntityState.Deleted;
                _context.SaveChanges();
            }


        }

        public void DeleteArmsDeliverable(IEnumerable<ArmsDeliverables> projectDeliverables)
        {
            foreach (var projDeliverable in projectDeliverables)
            {
                ArmsDeliverables armsDeliverableToDelete = _mapper.Map<ArmsDeliverables>(projDeliverable);
                _context.ArmsDeliverables.Update(armsDeliverableToDelete);
                _context.Attach(armsDeliverableToDelete);
                _context.Entry(armsDeliverableToDelete).State = EntityState.Deleted;
                _context.SaveChanges();
            }
        }



        public List<ProjDeliverables> GetAllDeliverablesbyProjectAsync(Guid prjId)
        {
            var customDeliverableList = GetDeliverablesByProjIdAsync(prjId).Result;
            var standDeliverableList = GetStandardDeliverables().Result;
            return customDeliverableList.Concat(standDeliverableList).ToList();
        }

        public async Task<List<ProjDeliverables>> GetStandardDeliverables()
        {

            return await (from d in _context.ArmsDeliverables.Where(ad => ad.DeliverableType == "S")
                          select new ProjDeliverables
                          {
                              ProjectDeliverableId = null,
                              DeliverableTxt = d.DeliverableTxt,
                              DeliverableId = d.DeliverableId,
                              ProjectId = null,
                              ProjAltId = d.ProjAltId,
                              ActiveInd = d.ActiveInd,
                              DeliverableType = d.DeliverableType
                          }).ToListAsync();
        }


        public async Task<List<ProjDeliverables>> GetDeliverablesByProjIdAsync(Guid prjId)
        {
            /*
            return await _context.ArmsProjectDeliverables
                 .Join(
                       _context.ArmsDeliverables,
                       PD => PD.DeliverableId,
                       D => D.DeliverableId,
                       (PD, D) => new ProjectDeliverablesForDisplay
                       {
                           ProjectDeliverableId = PD.ProjectDeliverableId,
                           DeliverableTxt = D.DeliverableTxt,
                           DeliverableId = D.DeliverableId,
                           ProjId=PD.ProjId
                       }
                ).Where(e => e.ProjId == prjId).ToListAsync();
            */

            return await (from pd in _context.ArmsProjectDeliverables
                          join d in _context.ArmsDeliverables on pd.DeliverableId equals d.DeliverableId
                          select new ProjDeliverables
                          {
                              ProjectDeliverableId = pd.ProjectDeliverableId,
                              DeliverableTxt = d.DeliverableTxt,
                              DeliverableId = d.DeliverableId,
                              ProjectId = pd.ProjId,
                              ProjAltId = d.ProjAltId,
                              ActiveInd = d.ActiveInd,
                              DeliverableType = d.DeliverableType
                          }).Where(e => e.ProjectId == prjId).ToListAsync();
        }


        public async Task<List<ArmsProjectDeliverables>> GetAllProjectDeliverablesAsync()
        {
            return await _context.ArmsProjectDeliverables.ToListAsync();
        }



        public async Task<List<ArmsDeliverables>> GetCustomDeliverablesByPrjAltId(Guid prjId)
        {
            return await (from pd in _context.ArmsProjectDeliverables.Where(p => p.ProjId == prjId)
                          join d in _context.ArmsDeliverables on pd.DeliverableId equals d.DeliverableId
                          select d).ToListAsync();
        }














        // look at this in future to see why updates dont work correctly. Might require a bit of research

        public void UpdateArmsProjectDeliverable(IEnumerable<ProjDeliverables> projectDeliverables)
        {

            foreach (var projDeliverable in projectDeliverables)
            {
                ArmsProjectDeliverables armsProjDeliverableToUpdate = _mapper.Map<ArmsProjectDeliverables>(projDeliverable);
                //      _context.ArmsProjectDeliverables.Update(armsProjDeliverableToUpdate);
                //       _context.Attach(armsProjDeliverableToUpdate);
                //      _context.Entry(armsProjDeliverableToUpdate).State = EntityState.Modified;
                _context.SaveChanges();
            }


        }


        public void UpdateArmsDeliverable(IEnumerable<ProjDeliverables> projectDeliverables)
        {
            foreach (var projDeliverable in projectDeliverables)
            {
                ArmsDeliverables armsDeliverableToUpdate = _mapper.Map<ArmsDeliverables>(projDeliverable);
                _context.ArmsDeliverables.Update(armsDeliverableToUpdate);
                _context.Attach(armsDeliverableToUpdate);
                _context.Entry(armsDeliverableToUpdate).State = EntityState.Modified;
                _context.SaveChanges();
            }

        }

        public void AddDeliverableEvents(ArmsDeliverables armsDeliverableToAdd, Guid PrjId)
        {
            Entities.Event newEvent = new Entities.Event
            {
                EventSrc = (Guid)armsDeliverableToAdd.DeliverableAltId,
                PrimaryTypeId = 12,
                SecondaryTypeId = null,
                InvoiceNumber = null,
                PublicCommentTxt = armsDeliverableToAdd.DeliverableTxt,
                PrivateCommentTxt = "",
                UserId = "Manoj",
                BeginDate = null,
                EndDate = null,
                ActiveInd = "A",
                EventId = Guid.NewGuid(),
                ProjectId = PrjId
            };
            // await _eventRepository.AddArmsEventAsync(newEvent);
        }
    }
}
