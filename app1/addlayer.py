import os
# from .models import Mine
from .models import Hospital
from django.contrib.gis.utils import LayerMapping


# mine_mapping = {
#     'layer': 'LAYER',
#     'name': 'Name',
#     'name_en': 'Name_En',
#     'mineral_na': 'Mineral_Na',
#     'mineral_1': 'Mineral_1',
#     'code_state': 'Code_State',
#     'et_id': 'ET_ID',
#     'geom': 'MULTIPOINT',    
# }
# Mine_shp = os.path.abspath(os.path.join(os.path.dirname(__file__) , 'Data/Mine.shp'))
# def run(verbose=True):
#     lm = LayerMapping(Mine , Mine_shp , mine_mapping , transform=False , encoding = 'utf-8')
#     print(lm)
#     lm.save(strict=True , verbose=verbose)


hospital_mapping = {
   'entity': 'ENTITY',
   'mslink_dmr': 'MSLINK_DMR',
   'fname': 'FNAME',
   'mapid': 'MAPID',
   'name': 'NAME',
   'kind': 'KIND',
   'capacity': 'CAPACITY',
   'operation_field': 'OPERATION_',
   'recno': 'RECNO',
   'fence': 'fence',
   'geom': 'MULTIPOLYGON',
}
Hospital_shp = os.path.abspath(os.path.join(os.path.dirname(__file__) , 'Data/medical.shp'))
def run(verbose=True):
   lm = LayerMapping(Hospital , Hospital_shp , hospital_mapping , transform=False, encoding = 'LATIN1')
   lm.save(strict=True , verbose=verbose)

    