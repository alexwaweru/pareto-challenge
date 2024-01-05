# from django.db.models.signals import post_save
# from django.dispatch import receiver

# from .models import Project
# from utils.embeddings import generate_embeddings

# @receiver(post_save, sender=Project)
# def create_profile(sender, instance, created, **kwargs):
#     if created:
#         text_to_embed_id = instance.id
#         text_to_embed = f"{instance.title}. {instance.description}"
#         generate_embeddings(text_to_embed_id, text_to_embed)
