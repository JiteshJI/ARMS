USE [ARMS1026]
GO

/****** Object: Table [dbo].[ARMS_BUDGET] Script Date: 06-12-2020 16:16:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

select * from [dbo].[ARMS_BUDGET] (
    [BUDGET_ID]        UNIQUEIDENTIFIER NOT NULL,
    [PHASE_ID]         UNIQUEIDENTIFIER NOT NULL,
    [BC_ALT_ID]        INT              NOT NULL,
    [BUDGET_TITLE]     NVARCHAR (255)   NOT NULL,
    [ODOT_FUNDING]     MONEY            NOT NULL,
    [ORG_COST_SHARING] MONEY            NOT NULL,
    [QTY]              INT              NULL,
    [ACTIVE_IND]       CHAR (1)         NOT NULL,
    [ENTRY_DT]         DATE             NOT NULL,
    [USER_ID]          NVARCHAR (50)    NOT NULL,
    [NOTES]            NVARCHAR (MAX)   NULL,
    [AMOUNT]           BIGINT           NULL
);


